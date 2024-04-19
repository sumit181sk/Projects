 

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={`px-6 py-2 duration-200 bg-black hover:bg-[#04BF8A] rounded-full border text-white ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
