import { useContext, useRef } from "react";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../authContext/AuthContext";

export default function ChangePass({ openModal, onClose }) {
  const newPass = useRef("");
  const CurrentPass = useRef("");
  const { setToken } = useContext(AuthContext);
  function handleChangePass() {
    return axios.request({
      method: "PATCH",
      url: "https://linked-posts.routemisr.com/users/change-password",
      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        password: CurrentPass.current.value,
        newPassword: newPass.current.value,
      },
    });
  }
  const { mutate } = useMutation({
    mutationFn: handleChangePass,
    onSuccess: (res) => {
      toast.success("Password changed successfully");
      setToken(res.data.token);
    },
    onError: () => {
      toast.error("Password changed failed");
    },
  });
  return (
    <Modal show={openModal} size="md" onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Change password
          </h3>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="current-password">Current password</Label>
            </div>
            <input type="text" className="input" ref={CurrentPass} />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="new-password">New password</Label>
            </div>
            <input type="text" className="input" ref={newPass} />
          </div>

          <div className="w-full flex justify-between gap-2">
            <Button onClick={mutate}>Confirm</Button>
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
