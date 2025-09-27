import os
import re
import argparse

def find_svg_files(directory):
    svg_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.svg'):
                svg_files.append(os.path.join(root, file))
    return svg_files

def update_svg_fill(file_path, new_color):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Replace both fill and stroke attributes
    def repl(m):
        return f'{m.group(1)}={m.group(2)}{new_color}{m.group(2)}'
    new_content, count = re.subn(
        r'(fill|stroke)=(["\'])(.*?)\2',
        repl,
        content
    )
    if count > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    return count > 0

def parse_args():
    parser = argparse.ArgumentParser(description="Change SVG fill color in a directory.")
    parser.add_argument('color', help='Nouvelle couleur hexadécimale (ex: #ff00ff)')
    parser.add_argument('-d', '--directory', help='Dossier à fouiller (défaut: ./dark)', default=None)
    return parser.parse_args()

def main(args):
    try:
        color = args.color
        if not re.match(r'^#?[0-9a-fA-F]{6}$', color):
            print("Erreur: la couleur doit être au format hexadécimal, ex: #ff00ff")
            return
        if not color.startswith('#'):
            color = '#' + color

        base_dir = args.directory or os.path.join(os.path.dirname(__file__), 'dark')
        if not os.path.isdir(base_dir):
            print(f"Erreur: dossier introuvable: {base_dir}")
            return

        svg_files = find_svg_files(base_dir)
        print(f"{len(svg_files)} fichiers SVG trouvés dans {base_dir}:")
        for f in svg_files:
            print(f" - {f}")

        confirm = input(f"\nModifier les champs fill de ces {len(svg_files)} fichiers en {color} ? (o/N): ")
        if confirm.lower() != 'o':
            print("Opération annulée.")
            return

        modified = 0
        for f in svg_files:
            if update_svg_fill(f, color):
                modified += 1

        print(f"{modified} fichiers modifiés.")

    except Exception as e:
        print(f"Erreur: {e}")

if __name__ == '__main__':
    args = parse_args()
    main(args)