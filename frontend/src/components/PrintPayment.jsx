import React from "react";

function PrintPayment(props) {
  const { componentRef } = props;

  return (
    <>
      <div ref={componentRef} className="w-full h-[window.innerHeight]">
        <div className="flex justify-between my-3 py-9 px-6 flex-col border-b-2 mx-9 border-b-gray-800">
          <h1 className="text-center text-3xl mb-2">
            PSS <span className="text-2xl">គ្រឿងសំណង់</span>
          </h1>
          <h2 className="">កាលបរិច្ឆេទ: 11/01/2023</h2>
          <h2 className="">អាសយដ្ធាន: ផ្ទះលេខ​​​​​​ ៩៩.បុរី​ មហាទេព</h2>
          <h2 className="">សង្កាត់ ស្វាយប៉ោ. ក្រុង បាត់ដំបង​​​​​​</h2>
          <p className="">Tel: 099 74 36 34 / 081 64 23 12</p>
          <h3 className="text-center text-lg font-semibold mt-8">វិក្កយបត្រ</h3>
        </div>
        <div class="relative overflow-x-auto bg-white mx-9">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-md uppercase text-gray-800">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-4 border-r dark:border-gray-700 border-b"
                >
                  Nº
                </th>
                <th
                  scope="col"
                  class="px-6 py-4 border-r dark:border-gray-700 border-b"
                >
                  ការបរិយាយ
                </th>
                <th
                  scope="col"
                  class="px-6 py-4 border-r dark:border-gray-700 border-b"
                >
                  បរិមាណ
                </th>
                <th
                  scope="col"
                  class="px-6 py-4 border-r dark:border-gray-700 border-b"
                >
                  តម្លៃ
                </th>
                <th scope="col" class="px-6 py-4 border-bx">
                  តម្លៃសរុប
                </th>
              </tr>
            </thead>
            <tbody className="text-md">
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 border-r dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 dark:border-gray-700 border-r font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Steel
                </th>
                <td class="px-6 py-4 dark:border-gray-700 border-r">3</td>
                <td class="px-6 py-4 dark:border-gray-700 border-r">$12</td>
                <td class="px-6 py-4">$12</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 dark:border-gray-700 border-r font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  2
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 dark:border-gray-700 border-r font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft
                </th>
                <td class="px-6 py-4 dark:border-gray-700 border-r">3</td>
                <td class="px-6 py-4 dark:border-gray-700 border-r">$120</td>
                <td class="px-6 py-4">$120</td>
              </tr>
              <tr class="bg-white dark:bg-gray-800 border-b">
                <th
                  scope="row"
                  class="px-6 py-4 dark:border-gray-700 border-r font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  3
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 dark:border-gray-700 border-r font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic
                </th>
                <td class="px-6 py-4 dark:border-gray-700 border-r">3</td>
                <td class="px-6 py-4 dark:border-gray-700 border-r">$38</td>
                <td class="px-6 py-4">$38</td>
              </tr>
              <tr class="bg-white dark:bg-gray-800 border-b">
                <th
                  scope="row"
                  class="px-6 py-4 dark:border-gray-700 border-r font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  4
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 dark:border-gray-700 border-r font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic
                </th>
                <td class="px-6 py-4 dark:border-gray-700 border-r">3</td>
                <td class="px-6 py-4 dark:border-gray-700 border-r">$38</td>
                <td class="px-6 py-4">$38</td>
              </tr>
              <tr class="bg-white dark:bg-gray-800 border-b">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                ></th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                ></th>
                <td class="px-6 py-4 dark:border-gray-700 border-r"></td>
                <td class="px-6 py-4 text-gray-800 dark:border-gray-700 border-r">
                  សរុប
                </td>
                <td class="px-6 py-4">$38</td>
              </tr>
              <tr class="bg-white">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                ></th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                ></th>
                <td class="px-6 py-4 dark:border-gray-700 border-r"></td>
                <td class="px-6 py-4 text-gray-800 dark:border-gray-700 border-r">
                  តម្លៃសរុប
                </td>
                <td class="px-6 py-4">$38</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-slate-800 h-[2px] mx-9 mt-4"></div>
        <div class="grid grid-cols-6 mt-3 gap-4 mx-9 text-sm">
          <div className="col-span-2">
            <h3>
              បង់ដោយ: <span></span>
            </h3>
          </div>
          <div className="col-span-2">
            <h3>
              ប្រាក់បានបង់: <span></span>
            </h3>
          </div>
          <div className="col-span-2">
            <h3>
              ប្រាក់បានអាប់: <span></span>
            </h3>
          </div>
        </div>
        <h3 className="text-center text-lg mt-9">
          Thank you ! Please come again
        </h3>
        <h3 className="text-center mt-1">ទំនិញទិញរួចមិនអាចដូរវិញបានទេ</h3>
        <h3 className="text-center text-xl mt-1">
          Goods sold are not returnable
        </h3>
      </div>
    </>
  );
}

export default PrintPayment;
