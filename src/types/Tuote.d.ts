import { KTuote } from "./KTuote";

export type Allergen = {
    allergenTypeCode: string;
    allergenTypeText: string;
    levelOfContainmentCode: string;
    __typename: string;
}

export type LocalizedProductInfoFields = {
    name: string;
    description: string;
    ingredientStatement: string;
    allergens: Allergen[];
    __typename: string;
}

export type LocalizedProductInfo = {
    fi: LocalizedProductInfoFields;
    en: LocalizedProductInfoFields;
    sv: LocalizedProductInfoFields;
    __typename: string;
}

export type HierarchyPathItem = {
    id: string;
    name: string;
    slug: string;
    __typename: string;
}

export type ProductPricing = {
    campaignPrice: number | null;
    lowest30DayPrice: number | null;
    campaignPriceValidUntil: string | null;
    comparisonPrice: number;
    comparisonUnit: string;
    currentPrice: number;
    depositPrice: number;
    isApproximatePrice: boolean;
    isForceSalesByCount: boolean;
    quantityMultiplier: number;
    salesUnit: string;
    regularPrice: number;
    __typename: string;
}

export type ProductImage = {
    urlTemplate: string;
    name: string;
    __typename: string;
}

export type ProductImages = {
    extensionString: string;
    mainImage: ProductImage;
    mobileReadyHeroImage: string | null;
    variableImages: any[];
    modifiersString: string;
    __typename: string;
}

export type ProductDetails = {
    productImages: ProductImages;
    wineSweetness: string | null;
    __typename: string;
}

export type Tuote = {
    consumerPackageSize: null;
    consumerPackageUnit: null;
    productType: string;
    localized: LocalizedProductInfo;
    __typename: string;
    id: string;
    storeId: string;
    availability: null;
    ean: string;
    name: string;
    price: number;
    approxPrice: boolean;
    basicQuantityUnit: string;
    comparisonPrice: number;
    comparisonUnit: string;
    priceUnit: string;
    quantityMultiplier: number;
    brandName: string;
    hierarchyPath: HierarchyPathItem[];
    isGlobalFallback: null;
    isAgeLimitedByAlcohol: boolean;
    isForceSalesByCount: boolean;
    pricing: ProductPricing;
    frozen: boolean;
    packagingLabelCodes: string[];
    productDetails: ProductDetails;
    isNewProduct: boolean;
    ktuote?: KTuote | null;
}