export default function Arrow(props: any) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <div
      className={`py-3 px-4 bg-dark-400 rounded-full absolute ${
        props.left ? "top-1/2 left-5" : "top-1/2 right-5"
      } cursor-pointer bg-white`}
    >
      <svg
        width="17"
        height="27"
        onClick={props.onClick}
        className={`arrow ${
          props.left ? "arrow--left" : "arrow--right"
        } ${disabled}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.1355 26.479L0 13.2395L14.1355 0L16.511 2.22494L4.75097 13.2395L16.511 24.2541L14.1355 26.479Z"
            fill="#00000"
          />
        )}
        {!props.left && (
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.69974 28.2955L0.324219 25.9199L12.0842 14.1599L0.324219 2.39993L2.69974 0.0244141L16.8352 14.1599L2.69974 28.2955Z"
            fill="#00000"
          />
        )}
      </svg>
    </div>
  );
}
