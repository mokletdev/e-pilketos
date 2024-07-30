import React from "react";
import Progress from "@/app/components/general/Progress";
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  Large_Text,
  Medium_Text,
} from "@/app/components/general/Text";
import { LinkButton } from "@/app/components/general/Button";
import Image from "next/image";
import Trash from "@/../public/images/TrashIcon.png";
import Edit from "@/../public/images/EditIcon.png";

export default function dashboard() {
  return (
    <main className="h-full overflow-x-hidden">
      <div className="w-full bg-red-light-6 gap-x-[28px] grid grid-cols-2 grid-rows-1">
        <div className="w-full h-[219px] bg-white rounded-[10px] shadow-md mt-[28px]">
          <div className="flex py-[28px] px-[64px] justify-between">
            <div className="grid grid-row">
              <H3>Total Vote</H3>
              <H4 className="">Siswa</H4>
              <Medium_Text
                variant="REGULAR"
                className="text-secondary-text-color"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Medium_Text>
            </div>
            <Progress percent={80} />
          </div>
        </div>
        <div className="w-full h-[219px] bg-white rounded-[10px] shadow-md mt-[28px]">
          <div className="flex py-[28px] px-[64px] justify-between">
            <div className="grid grid-row">
              <H3>Total Vote</H3>
              <H4 className="">Guru</H4>
              <Medium_Text
                variant="REGULAR"
                className="text-secondary-text-color"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Medium_Text>
            </div>
            <Progress percent={80} />
          </div>
        </div>
      </div>
      <div className="mt-[28px] pb-[52px]">
        <div className="w-full h-[219px] bg-white rounded-[10px] shadow-md mt-[28px]">
          <div className="flex py-[28px] px-[64px] justify-between">
            <div className="grid grid-row">
              <H3>Total Vote</H3>
              <H4 className="">Semua</H4>
              <Medium_Text
                variant="REGULAR"
                className="text-secondary-text-color"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Medium_Text>
            </div>
            <Progress percent={80} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-[36px]">
        <div>
          <H5>User Management</H5>
          <Medium_Text variant="REGULAR" className="text-secondary-text-color">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Medium_Text>
        </div>
        <div>
          <button className="px-6 py-3 flex bg-primary-color border-2 border-primary-color text-white rounded-full transition-all duration-300 ease-in-out hover:bg-transparent hover:text-primary-color">
            <svg
              className="w-6 h-6 mr-[10px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Tambah User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md rounded-[15px]">
        <table className="w-full text-sm text-left rtl:text-right border border-gray-300">
          <thead className="text-[14px] bg-white">
            <tr className="border-b border-gray-300">
              <th scope="col" className="px-6 py-3 border-r border-gray-300">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-color bg-gray-100 border-gray-300 rounded-[20px] focus:ring-primary-color"
                />
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-300">
                Nomor
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-300">
                Nama
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-300">
                Email
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-300">
                Role
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-300">
                Last Active
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:border-gray-700">
              <th scope="col" className="px-6 py-3 border-r border-gray-300">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-[20px] focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r border-gray-300"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4 border-r border-gray-300">Silver</td>
              <td className="px-6 py-4 border-r border-gray-300">Laptop</td>
              <td className="px-6 py-4 border-r border-gray-300">$2999</td>
              <td className="px-6 py-4 border-r border-gray-300">Text</td>
              <td className="px-6 py-4 flex">
                <button className="p-[8px] bg-[#D0F0FD] text-white rounded-md">
                  <Image src={Edit} alt="edit" />
                </button>
                <button className="p-[8px] bg-red-light-4 text-white rounded-md ml-2">
                  <Image src={Trash} alt="delete" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
