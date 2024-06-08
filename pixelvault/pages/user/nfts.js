import {
  useOwnedNFTs,
  useContract,
  useAddress,
  useMintNFT,
  Web3Button,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import PixelvaultNavbar from "../../components/PixelvaultNavbar";
import NFTCard from "../../components/NFTCard";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { NFT_CONTRACT_ADDRESS } from "../../const/addresses";
import { FaCloudUploadAlt } from "react-icons/fa";
import { isLength } from "validator";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NFTs = () => {
  const address = useAddress();
  const [fileselected, setfileselected] = useState(false);
  const [mintnftdata, setmintnftdata] = useState({
    Name: "",
    Description: "",
    Image: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { contract } = useContract(NFT_CONTRACT_ADDRESS);
  const { data, isLoading, error } = useOwnedNFTs(contract, address);
  const {
    mutateAsync: mintNft,
    isLoading: mintnftloading,
    error: mintnfterror,
  } = useMintNFT(contract);
  const onchangemintnftdata = (e) => {
    setmintnftdata({ ...mintnftdata, [e.target.name]: e.target.value });
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
    setmintnftdata({ ...mintnftdata, Image: base64 });
  };

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
      <PixelvaultNavbar />
      {isLoading ? (
        <div className="flex flex-wrap gap-10 justify-center md:justify-normal md:m-10">
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
          <Card className="max-w-[350px] min-w-[250px]  min-h-[300px]">
            <Skeleton className="m-5 mb-0 h-[200px] max-w-[250px] min-w-[200px] rounded-lg"></Skeleton>
            <Skeleton className="mt-2 ml-5 mr-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
            <Skeleton className="mt-2 mb-5 mr-5 ml-5 h-[20px] max-w-[250px] min-w-[200px] rounded-md"></Skeleton>
          </Card>
        </div>
      ) : (
        <div className="flex md:m-10 flex-col">
          <div className="flex justify-end mr-10">
            <Card>
              <Button
                onPress={onOpen}
                className="w-40 h-12 text-black text-lg font-semibold p-2 bg-white"
              >
                Mint NFT
              </Button>
            </Card>
          </div>
          <div className="flex flex-wrap gap-10 justify-center md:justify-normal">
            {data.map((item, index) => {
              return <NFTCard key={index} nftdata={item} />;
            })}
          </div>
        </div>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                NFT Details
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  name="Name"
                  label="Name"
                  value={mintnftdata.Name}
                  onChange={(e) => onchangemintnftdata(e)}
                />
                <Input
                  type="text"
                  name="Description"
                  label="Description"
                  value={mintnftdata.Description}
                  onChange={(e) => onchangemintnftdata(e)}
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Web3Button
                  contractAddress={NFT_CONTRACT_ADDRESS}
                  action={() =>{
                    if (!isLength(mintnftdata.Name, { min: 2, max: undefined })) {
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
                    else{
                      mintNft({
                      metadata: {
                          name: mintnftdata.Name,
                          description: mintnftdata.Description,
                          image: mintnftdata.Image, // Accepts any URL or File type
                        },
                        to: address, // Use useAddress hook to get current wallet address
                      })
                    }
                  }
                    
                  }
                >
                  Mint NFT
                </Web3Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NFTs;
