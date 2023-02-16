const NotFound = () => {
	return /* html */ `
    <div class='flex items-center justify-center flex-col w-full h-screen bg-lightMode'>
      <h1 class='text-[120px] font-bold'>404</h1>
      <h2 class='md:text-[60px] text-[30px] capitalize text-center'>page not found!</h2>
      <a href="/" class='py-2 px-6 rounded bg-blue-400 font-semibold capitalize mt-6 text-white'>back to portfolio</a>
    </div>
  `;
};

export default NotFound;
