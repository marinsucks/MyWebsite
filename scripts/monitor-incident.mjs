import { pathToFileURL } from 'node:url';

export async function reportIncident(environment, fetchImplementation = fetch) {
  const repository = environment.GITHUB_REPOSITORY;
  if (repository !== 'marinsucks/MyWebsite') throw new Error('Unexpected monitoring repository');
  const title = '[Monitoring] Application or contact provider incident';
  const marker = '<!-- portfolio-provider-monitor -->';
  const runUrl = `https://github.com/${repository}/actions/runs/${environment.GITHUB_RUN_ID}`;
  const failed = environment.MONITOR_RESULT !== 'success';

  async function github(path, method = 'GET', body) {
    const response = await fetchImplementation(`https://api.github.com/repos/${repository}${path}`, {
      method,
      headers: { authorization: `Bearer ${environment.GITHUB_TOKEN}`, accept: 'application/vnd.github+json', 'content-type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error(`GitHub incident notification failed: HTTP ${response.status}`);
    return response.json();
  }

  let incident;
  for (let page = 1; ; page++) {
    const issues = await github(`/issues?state=open&per_page=100&page=${page}`);
    incident = issues.find(issue => !issue.pull_request && issue.title === title && issue.body?.includes(marker) && issue.user?.login === 'github-actions[bot]');
    if (incident || issues.length < 100) break;
    if (page === 10) throw new Error('Unable to safely find the existing monitoring issue');
  }
  if (failed) {
    const body = `${marker}\nLe contrôle réel de l'application ou de ses fournisseurs a échoué.\n\n[Consulter le run et le test en échec](${runUrl}).\n\nLes contrôles couvrent le site/API publics, Turnstile, l'envoi Resend et les problèmes de livraison récents. Cette alerte passe par GitHub, sans dépendre de Resend. Aucun contenu de message ni destinataire n'est publié ici.\n\nL'incident sera fermé après un contrôle entièrement réussi.`;
    if (incident) await github(`/issues/${incident.number}`, 'PATCH', { body });
    else await github('/issues', 'POST', { title, body, assignees: ['marinsucks'] });
    console.log('Monitoring incident is open and assigned to marinsucks.');
  } else if (incident) {
    await github(`/issues/${incident.number}/comments`, 'POST', { body: `Tous les contrôles sont à nouveau verts : [run de rétablissement](${runUrl}).` });
    await github(`/issues/${incident.number}`, 'PATCH', { state: 'closed', state_reason: 'completed' });
    console.log('Monitoring incident resolved.');
  } else {
    console.log('All checks passed; no open monitoring incident.');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await reportIncident(process.env);
}
