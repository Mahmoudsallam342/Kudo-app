import {
  Avatar,
  Button,
  Card,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
import ChangePass from "../changePass/ChangePass";
import { UptadeProfilePhoto } from "./UptadeProfilePhoto";

export default function ProfileCard() {
  const { userData } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Card className="max-w-3xl mx-auto">
        {userData && (
          <div className="flex flex-col items-center pb-10 ">
            <div className="relative">
              <Avatar
                className="mb-3 rounded-full shadow-lg avatar max-w-32"
                alt={userData.name}
                img={userData.photo}
                rounded
              />
              <UptadeProfilePhoto />
            </div>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {userData.name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {userData.email}
            </span>
            <div className="mt-4 flex space-x-3 lg:mt-6">
              <Button
                color="light"
                onClick={() => setOpenModal(true)}
                className="border border-gray-300"
              >
                Change password
              </Button>
            </div>
          </div>
        )}
        <ChangePass openModal={openModal} onClose={onCloseModal} />
      </Card>
    </>
  );
}
