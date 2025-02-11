type Props = {
  openMobileMenu: boolean;
  setOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Navbar(props: Props) {
  const { openMobileMenu, setOpenMobileMenu } = props;

  return (
    <nav className='h-full my-0 mx-auto flex justify-between items-center p-4'>
      <h1 className='text-xl sm:text-2xl font-bold'>Pathfinding Visualizer</h1>
      <div
        className='space-y-2 cursor-pointer sm:(hidden)'
        onClick={() => setOpenMobileMenu(!openMobileMenu)}>
        {openMobileMenu ? (
          <div className='i-lucide:x h-6 w-6' />
        ) : (
          <div className='i-lucide:menu h-6 w-6' />
        )}
      </div>
    </nav>
  );
}
