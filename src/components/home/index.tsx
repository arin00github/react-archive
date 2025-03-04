"use client";

import { useRouter } from "next/navigation";

import { navMenus } from "@/constant/navigation";
import { BasicStyleLayout } from "../_common/style/BasicLayout";

const HomeContainer = () => {
  const router = useRouter();
  return (
    <BasicStyleLayout>
      <div className="centerBox">
        {navMenus.map((menu) => {
          return (
            <div key={menu.id}>
              <div
                onClick={() => {
                  router.push(menu.href);
                }}
              >
                {menu.label}
              </div>
            </div>
          );
        })}
      </div>
    </BasicStyleLayout>
  );
};

export default HomeContainer;
