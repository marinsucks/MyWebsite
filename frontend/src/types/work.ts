type WorkProps = {
	title: string;
	description: string;
	tags: {
		technical: string[];
		thematical: string[];
	};
	onClick: () => void;
};

export default WorkProps;