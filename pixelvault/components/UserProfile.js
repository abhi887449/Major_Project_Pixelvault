import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Image,
  Input,
  Link,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { useAddress, useConnectionStatus } from "@thirdweb-dev/react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { isBase64, isEmail, isLength } from "validator";

const UserProfile = () => {
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const addressref = useRef(false);
  const [userdata, setuserdata] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formdata, setFormdata] = useState({});
  const [fileselected, setfileselected] = useState(null);
  const fetchuserdata = async () => {
    try {
      const url = `http://localhost:3000/api/fetchUserData`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: address,
        }),
      });
      const json = await response.json();
      setuserdata(json.user);
      setFormdata({
        Name: json.user["Name"],
        Username: json.user["Username"],
        ProfileImage: json.user["ProfileImage"],
        Email: json.user["Email"],
        Instagram: json.user.SocialLinks["Instagram"],
        Linkedin: json.user.SocialLinks["Linkedin"],
        Facebook: json.user.SocialLinks["Facebook"],
      });
    } catch (error) {
      toast.error(
        "Something went wrong. Please disconnect wallet and connect again",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );
    }
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (errors) => {
        reject(errors);
      };
    });
  };

  const handlefileupload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setfileselected(e.target.files[0]?.name);
    setFormdata({ ...formdata, ProfileImage: base64 });
  };
  const onchangeformdata = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handlesubmitform = async () => {
    if (!isLength(formdata.Name, { min: 2, max: undefined })) {
      toast.error("Please enter atleast 3 characters in name", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    if (!isEmail(formdata.Email)) {
      toast.error("Please enter valid email!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    if (!isLength(formdata.Username, { min: 2, max: undefined })) {
      toast.error("Please enter atleast 3 characters in username", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    const url = `http://localhost:3000/api/updateUserData`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        Name: formdata.Name,
        Email: formdata.Email,
        ProfileImage: formdata.ProfileImage,
        Username: formdata.Username,
        SocialLinks: {
          Instagram: formdata.Instagram,
          Linkedin: formdata.Linkedin,
          Facebook: formdata.Facebook,
        },
      }),
    });
    const json = await response.json();
    if (json?.success) {
      setuserdata({
        ...userdata,
        address: json.success.Name,
        Name: json.success.Name,
        Email: json.success.Email,
        ProfileImage: json.success.ProfileImage,
        Username: json.success.Username,
        SocialLinks: {
          Instagram: json.success.SocialLinks.Instagram,
          Linkedin: json.success.SocialLinks.Linkedin,
          Facebook: json.success.SocialLinks.Facebook,
        }
      });
      toast.success("Profile details updated successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      toast.error(
        "Something went wrong. Please disconnect wallet and connect again",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );
    }
  };
  useEffect(() => {
    if (connectionStatus === "connected") {
      if (addressref.current === false) {
        fetchuserdata();
        return () => {
          addressref.current = true;
        };
      }
    }
  }, [addressref, connectionStatus]);
  console.log(userdata);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="m-3 md:m-10 bg-transparent grid grid-flow-row-dense xl:grid-cols-3 xl:grid-rows-1 md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-1 gap-5">
        <div>
          <Image
            isBlurred
            isZoomed
            src={
              userdata && !(userdata["ProfileImage"] === "")
                ? userdata["ProfileImage"]
                : "/images/pixelvaultlogo.png"
            }
            alt="NextUI Album Cover"
            className="min-w-full md:max-w-[360px] md:max-h-[360px]"
          />
        </div>
        <div className="xl:col-span-2">
          {userdata ? (
            <Card>
              <CardBody>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn></TableColumn>
                    <TableColumn className="flex justify-end">
                      <Tooltip content="Edit profile details" color="success">
                        <Button onPress={onOpen} className="bg-transparent">
                          <FaEdit className="text-3xl" />
                        </Button>
                      </Tooltip>
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>Name</TableCell>
                      <TableCell>{userdata?.Name}</TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell>Email</TableCell>
                      <TableCell>{userdata?.Email || "-"}</TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell>Username</TableCell>
                      <TableCell>{userdata?.Username || "-"}</TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell>Instagram</TableCell>
                      <TableCell>
                        <Link href={userdata?.SocialLinks?.Instagram}>
                          {userdata?.SocialLinks?.Instagram || "-"}
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow key="5">
                      <TableCell>Linkedin</TableCell>
                      <TableCell>
                        <Link href={userdata?.SocialLinks?.Linkedin}>
                          {userdata?.SocialLinks?.Linkedin || "-"}
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow key="6">
                      <TableCell>Facebook</TableCell>
                      <TableCell>
                        <Link href={userdata?.SocialLinks?.Facebook}>
                          {userdata?.SocialLinks?.Facebook || "-"}
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody className="flex flex-col gap-5">
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn></TableColumn>
                    <TableColumn className="flex justify-end">
                      <Tooltip content="Edit profile details" color="success">
                        <Button className="bg-transparent">
                          <FaEdit className="text-3xl" />
                        </Button>
                      </Tooltip>
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>Name</TableCell>
                      <TableCell>
                        <Skeleton className="h-7 w-40 rounded-md"></Skeleton>
                      </TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell>Email</TableCell>
                      <TableCell>
                        <Skeleton className="h-7 w-40 rounded-md"></Skeleton>
                      </TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell>Username</TableCell>
                      <TableCell>
                        <Skeleton className="h-7 w-40 rounded-md"></Skeleton>
                      </TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell>Instagram</TableCell>
                      <TableCell>
                        <Skeleton className="h-7 w-40 rounded-md"></Skeleton>
                      </TableCell>
                    </TableRow>
                    <TableRow key="5">
                      <TableCell>Linkedin</TableCell>
                      <TableCell>
                        <Skeleton className="h-7 w-40 rounded-md"></Skeleton>
                      </TableCell>
                    </TableRow>
                    <TableRow key="6">
                      <TableCell>Facebook</TableCell>
                      <TableCell>
                        <Skeleton className="h-7 w-40 rounded-md"></Skeleton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Profile Details
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  name="Name"
                  label="Name"
                  value={formdata?.Name}
                  onChange={(e) => onchangeformdata(e)}
                />
                <Input
                  type="email"
                  name="Email"
                  label="Email"
                  value={formdata?.Email}
                  onChange={(e) => onchangeformdata(e)}
                />
                <Input
                  type="text"
                  name="Username"
                  label="Username"
                  value={formdata?.Username}
                  onChange={(e) => onchangeformdata(e)}
                />
                <Card className="bg-secondary" isPressable>
                  <CardBody>
                    <label
                      className="flex flex-row gap-3"
                      htmlFor="ProfileImage"
                    >
                      Choose Avatar <FaCloudUploadAlt className="text-2xl" />
                    </label>
                    <span className="text-sm">
                      {fileselected ? fileselected : "No file chosen"}
                    </span>
                  </CardBody>
                </Card>

                <input
                  className="hidden"
                  type="file"
                  accept=".jpeg, .png, .jpg"
                  name="ProfileImage"
                  id="ProfileImage"
                  label="ProfileImage"
                  onChange={(e) => handlefileupload(e)}
                />
                <Input
                  type="text"
                  name="Instagram"
                  label="Instagram"
                  value={formdata?.Instagram}
                  onChange={(e) => onchangeformdata(e)}
                />
                <Input
                  type="text"
                  name="Linkedin"
                  label="Linkedin"
                  value={formdata?.Linkedin}
                  onChange={(e) => onchangeformdata(e)}
                />
                <Input
                  type="text"
                  name="Facebook"
                  label="Facebook"
                  value={formdata?.Facebook}
                  onChange={(e) => onchangeformdata(e)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    handlesubmitform();
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfile;
