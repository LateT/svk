// Type for LocalizedName
export type LocalizedName = {
    finnish: string;
    swedish: string;
    english: string;
    __typename: "LocalizedName";
  };
  
  // Type for AdInfo
  export type AdInfo = {
    highlightAd: boolean;
    isSponsored: boolean;
    clickUrl: string | null;
    impressionUrl: string | null;
    __typename: "AdInfo";
  };
  
  // Type for Availability
  export type Availability = {
    storeId: string;
    web: boolean;
    store: boolean;
    __typename: "Availability";
  };
  
  // Type for UnitPrice
  export type UnitPrice = {
    value: number;
    unit: string;
    __typename: "UnitPrice";
  };
  
  // Type for ProductPrice
  export type ProductPrice = {
    price: number;
    unit: string;
    isApproximate: boolean;
    componentPrice: number | null;
    unitPrice: UnitPrice;
    __typename: "ProductPrice";
  };
  
  // Type for DiscountAvailability
  export type DiscountAvailability = {
    store: boolean;
    web: boolean;
    daily: boolean | null;
    __typename: "DiscountAvailability";
  };
  
  // Type for DiscountPrice
  export type DiscountPrice = {
    price: number;
    unit: string;
    isApproximate: boolean;
    unitPrice: UnitPrice;
    startDate: string;
    endDate: string;
    discountType: string;
    discountPercentage: number;
    tosRestrictionText: string | null;
    maxItems: number | null;
    discountAvailability: DiscountAvailability;
    __typename: "DiscountPrice";
  };
  
  // Type for ProductPricing
  export type ProductPricing = {
    normal: ProductPrice;
    discount: DiscountPrice | null; // May be null
    batch: unknown | null; // Assuming batch can be of any type or null
    __typename: "ProductPricing";
  };
  
  // Main type for KTuote
  export type KTuote = {
    localizedName: LocalizedName;
    localStoreId: string | null;
    productType: string; // You can make this an enum if the values are limited
    imageUrl: string;
    restriction: unknown | null; // Assuming restriction can be of any type or null
    isDomestic: boolean;
    adInfo: AdInfo;
    id: string;
    ean: string;
    storeId: string;
    productAvailabilities: Availability[];
    __typename: "Product";
    pricing: ProductPricing;
  };
  