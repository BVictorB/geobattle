const Error = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <path 
      fill={color}
      d="M64 0a64 64 0 1064 64A64 64 0 0064 0zm30.2 84.31l-9.89 9.9L64 73.91 43.7 94.23l-9.89-9.91L54.11 64l-20.3-20.32 9.89-9.9L64 54.1l20.3-20.31 9.89 9.9L73.91 64z"
    />
  </svg>
)

export default Error
