import React from "react";

const AddCustomer = () => {
  return (
    <>
      <div className="flex-1">
        <h3 className="h-16 ml-6 flex items-center text-xl">បន្ថែមផលិតផល</h3>
        <div className="grid grid-cols-4 gap-4 ml-6 mr-6 bg-[#DDDDDD] h-[630px] border-t-4 border-t-blue-400">
          <div className="col-span-2">
            <h3 className="text-md m-2 my-6 text-gray-600">
              សូមបញ្ចូលពត៍មានរបស់​អាតិថិជន
            </h3>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                នាមត្រកូល
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                នាមខ្លួន
              </label>
              <input type="select" className="outline-none h-8 p-2" />
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                លេខទូរសព្ទ
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                អុីម៉ែល
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                អាស័យដ្ថានទី​-១
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                អាស័យដ្ថានទី​-២
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                ទីក្រុង
              </label>
              <input type="text" className="outline-none h-8 p-2" />
            </div>
          </div>
          <div className="col-span-2 mt-14">
            <div className="flex flex-col m-2 ml-6 mt-4">
              <label htmlFor="text" className="text-sm mb-1">
                ជ្រើសរើសរូបភាព
              </label>
              <input type="file" className="outline-none h-32 p-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;
