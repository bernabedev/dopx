export interface CurrentRateResponse {
  success: boolean;
  data: {
    result: {
      actualPurchaseValue: number;
      actualPurchaseInteranualValue: number;
      actualPurchaseAccumulatedValue: number;
      actualSellingValue: number;
      actualSellingInteranualValue: number;
      actualSellingAccumulatedValue: number;
      date: string;
      actualPurchaseInteranualValueFormatted: string;
      actualPurchaseAccumulatedValueFormatted: string;
      actualPurchaseValueFormatted: string;
      actualSellingInteranualValueFormatted: string;
      actualSellingAccumulatedValueFormatted: string;
      actualSellingValueFormatted: string;
    };
    targetUrl: null;
    success: boolean;
    error: null;
    unAuthorizedRequest: boolean;
    __abp: boolean;
  };
}

export interface HistoryItem {
  purchaseValue: number;
  purchaseInteranualValue: number;
  purchaseAccumulatedValue: number;
  sellingValue: number;
  sellingInteranualValue: number;
  sellingAccumulatedValue: number;
  purchaseValueFormatted: string;
  purchaseInteranualValueFormatted: string;
  purchaseAccumulatedValueFormatted: string;
  sellingValueFormatted: string;
  sellingInteranualValueFormatted: string;
  sellingAccumulatedValueFormatted: string;
  date: string;
  statisticDataGroupName: string;
  id: number;
}

export interface HistoryRateResponse {
  success: boolean;
  data: {
    result: {
      totalCount: number;
      items: HistoryItem[];
    };
    targetUrl: null;
    success: boolean;
    error: null;
    unAuthorizedRequest: boolean;
    __abp: boolean;
  };
}

export interface CurrentRate {
  actualPurchaseValue: number;
  actualPurchaseInteranualValue: number;
  actualPurchaseAccumulatedValue: number;
  actualSellingValue: number;
  actualSellingInteranualValue: number;
  actualSellingAccumulatedValue: number;
  date: string;
  actualPurchaseInteranualValueFormatted: string;
  actualPurchaseAccumulatedValueFormatted: string;
  actualPurchaseValueFormatted: string;
  actualSellingInteranualValueFormatted: string;
  actualSellingAccumulatedValueFormatted: string;
  actualSellingValueFormatted: string;
}

export interface HistoryItem {
  purchaseValue: number;
  purchaseInteranualValue: number;
  purchaseAccumulatedValue: number;
  sellingValue: number;
  sellingInteranualValue: number;
  sellingAccumulatedValue: number;
  purchaseValueFormatted: string;
  purchaseInteranualValueFormatted: string;
  purchaseAccumulatedValueFormatted: string;
  sellingValueFormatted: string;
  sellingInteranualValueFormatted: string;
  sellingAccumulatedValueFormatted: string;
  date: string;
  statisticDataGroupName: string;
  id: number;
}
