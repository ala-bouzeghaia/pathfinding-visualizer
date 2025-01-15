type Props = {
  setAlgo: (value: string) => void;
};

export function Navbar(props: Props) {
  const { setAlgo } = props;

  return (
    <nav className='h-full w-full max-w-[1000px] my-0 mx-auto flex justify-between items-center p-4'>
      <h1 className='text-2xl font-bold'>Logo</h1>
      <ul className='flex space-x-4'>
        <li>
          <button onClick={() => setAlgo("Home")}>Home</button>
        </li>
        <li>
          <button onClick={() => setAlgo("About")}>About</button>
        </li>
        <li>
          <button onClick={() => setAlgo("Contact")}>Contact</button>{" "}
        </li>
      </ul>
    </nav>
  );
}
