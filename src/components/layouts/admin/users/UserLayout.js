const UserLayout = () => {
	return /* html */ `
    <div class='flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden'>
      <h1 class="text-2xl font-semibold mb-10">Thông tin cơ bản của người dùng</h1>
      <div class="grid xl:grid-cols-2 grid-cols-1 gap-x-4">
        <div class='flex flex-col mb-5'>
          <label for="" class='capitalize'>Tên dự án</label>
          <input
            type="text" name="" id="name"
            class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
            placeholder='Tên dự án'
          />
        </div>
        <div class='flex flex-col mb-5'>
          <label for="" class='capitalize'>link dự án</label>
          <input
            type="text" name="" id="link"
            class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
            placeholder='Link dự án'
          />
        </div>
        <div class='flex flex-col mb-5'>
          <label for="" class='capitalize'>Thời gian bắt đầu</label>
          <input
            type="date" name="" id="date-start"
            class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
            placeholder='Thời gian'
          />
        </div>
        <div class='flex flex-col mb-5'>
          <label for="" class='capitalize'>Thời gian kết thúc</label>
          <input
            type="date" name="" id="date-end"
            class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
            placeholder='Thời gian'
          />
        </div>
        <div class='flex flex-col mb-5'>
          <label for="" class='capitalize'>Công nghệ sử dụng</label>
          <input
            type="text" name="" id="techonology"
            class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
            placeholder='Công nghệ sử dụng'
          />
        </div>
      </div>
    </div>
  `;
};

export default UserLayout;
