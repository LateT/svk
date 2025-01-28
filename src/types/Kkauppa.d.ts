export type OpeningHoursDay = {
    date: string;
    opens: string;
    closes: string;
    state: string;
    __typename: string;
  };
  
  export type FirstFreeDeliveryTime = {
    method: string;
    date: string;
    __typename: string;
  };
  
  export type StoreInfo = {
    chainOfferPdfUrl: string;
    storeOfferPdfUrl: string | null;
    __typename: string;
  };
  
  export type KKauppa = {
    id: string;
    name: string;
    chain: string;
    chainlessName: string;
    openingHours: OpeningHoursDay[];
    deliveryMethods: string[];
    municipality: string;
    firstFreeDeliveryTimes: FirstFreeDeliveryTime[];
    deliveryAreas: string[];
    infoNotification: string | null;
    info: StoreInfo;
    __typename: string;
  };