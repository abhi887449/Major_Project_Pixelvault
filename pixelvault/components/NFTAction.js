import { Button, Card, Link, Skeleton, User } from "@nextui-org/react";
import {
  Web3Button,
  useAddress,
  useBuyDirectListing,
  useCancelDirectListing,
  useConnectionStatus,
  useCreateDirectListing,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from "../const/addresses";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Input,
} from "@nextui-org/react";

const NFTAction = (props) => {
  const { nftdata, directListings, marketplacecontract } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const address = useAddress();
  const [listingprice, setlistingprice] = useState("");
  const [isuserdataloaded, setuserdataloaded] = useState({
    user: {},
    isuserdataloading: false,
  });
  const connectionStatus = useConnectionStatus();
  const {
    mutateAsync: buyDirectListing,
    isLoading: buyDirectListingisLoading,
    error: buyDirectListingerror,
  } = useBuyDirectListing(marketplacecontract);
  const {
    mutateAsync: createDirectListing,
    isLoading: createDirectListingisLoading,
    error: createDirectListingisLoadingerror,
  } = useCreateDirectListing(marketplacecontract);
  const {
    mutateAsync: cancelDirectListing,
    isLoading: cancelDirectListingisLoading,
    error: cancelDirectListingerror,
  } = useCancelDirectListing(marketplacecontract);
  const fetchuser = async () => {
    const url = `http://localhost:3000/api/fetchUserData`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: nftdata?.owner,
        }),
      });
      const json = await response.json();
      setuserdataloaded({
        ...isuserdataloaded,
        user: json.user,
        isuserdataloading: true,
      });
    } catch (error) {
      toast.error("Something went wrong fetching user data", {
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
  };

  useEffect(() => {
    if (connectionStatus === "connected") {
      fetchuser();
    }
  }, [connectionStatus, buyDirectListingisLoading, directListings]);
  return (
    <Card className="min-w-[300px] p-5">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Direct Listing
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Price"
                  placeholder="Enter Price"
                  variant="bordered"
                  type="number"
                  name="price"
                  onChange={(e) => setlistingprice(e.target.value)}
                  value={listingprice}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="!text-sm !h-11 !p-2"
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Web3Button
                  className="!bg-success !text-sm !h-10 !p-2"
                  contractAddress={MARKETPLACE_CONTRACT_ADDRESS}
                  action={() =>
                    createDirectListing({
                      assetContractAddress: NFT_CONTRACT_ADDRESS,
                      tokenId: nftdata?.metadata?.id,
                      pricePerToken: listingprice,
                      isReservedListing: false,
                      startTimestamp: new Date(),
                    })
                  }
                >
                  Create Direct Listing
                </Web3Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">
        {nftdata?.metadata?.name}
      </h1>
      {isuserdataloaded.isuserdataloading ? (
        <div
          className="text-white mb-5"
          size="sm"
        >
          <User
            isFocusable
            name={isuserdataloaded?.user?.Name}
            className="!justify-normal"
            description={
              <div
                className="text-default-500 text-[10px]"
                size="sm"
              >
                {nftdata?.owner}
              </div>
            }
            avatarProps={{
              src: `${isuserdataloaded?.user?.ProfileImage}`,
            }}
          />
        </div>
      ) : (
        <div className="max-w-[300px] w-full flex items-center gap-3 mb-5">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      )}

      <Card className="mb-3 p-2">
        <div>Price</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-success">
          {directListings && directListings[0]
            ? `${directListings[0]?.currencyValuePerToken.displayValue} ${directListings[0]?.currencyValuePerToken.symbol}`
            : "Not Listed"}
        </h1>
      </Card>
      <div className="flex justify-center">
        {nftdata?.owner === address ? (
          directListings && directListings[0] ? (
            <Web3Button
              contractAddress={MARKETPLACE_CONTRACT_ADDRESS}
              action={() => cancelDirectListing(directListings[0]?.id)}
            >
              Cancel Listing
            </Web3Button>
          ) : (
            <Button className="w-40 h-12 text-black text-lg font-semibold p-2 bg-white" color="default" onPress={onOpen}>
              List
            </Button>
          )
        ) : directListings && directListings[0] ? (
          <Web3Button
            contractAddress={MARKETPLACE_CONTRACT_ADDRESS}
            action={() => {
              try {
                buyDirectListing({
                  listingId: directListings[0]?.id, // ID of the listing to buy
                  quantity: "1",
                  buyer: address, // Wallet to buy for
                });
              } catch (error) {
                toast.error("Something went wrong", {
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
            }}
          >
            Buy Now
          </Web3Button>
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
};

export default NFTAction;
