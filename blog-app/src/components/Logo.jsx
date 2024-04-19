import logo from "/blog-logo-white.png";

const Logo = ({width, height}) => {
  return (
     <img src={logo} width={width} height={height} className="mt-5"/> 
  )
}

export default Logo