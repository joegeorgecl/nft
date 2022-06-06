const TagButton = ({ name, val , handleSetTag, tagActive }) => {
	return (
		<li className="nav-item" role="presentation">
			<button className={`tab-link border-0 ${tagActive ? 'active' : null}`} onClick={() => handleSetTag(val)}>
				{name.toUpperCase()}
			</button>
		</li>
	);
};

export default TagButton;