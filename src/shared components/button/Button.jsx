function Button({
  padding = [2, 6],
  fontSize = 1.6,
  bg = "#4c6e97",
  className,
  children,
}) {
  const btnInlineStyle = {
    padding: `${padding[0]}rem ${padding[1]}rem`,
    fontSize: `${fontSize}rem`,
    backgroundColor: `${bg}`,
  };

  return (
    <>
      <button className={className} style={{ ...btnInlineStyle }}>
        {children}
      </button>
    </>
  );
}

export default Button;
