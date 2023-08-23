export interface IUser {
  activityLevelFactor: string;
  shippingAddress: string;
  username: string;
  email: string;
  paymentInfo: {};
  subscriptionPlan: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  verifyUser: boolean;

  // subscriptionPlan?: () => void;
  currentBMI?: () => void;
  setGoalWithBMI?: () => void;
  recommendationForMultipleApproachToReachGoalDependingTimeNCalories?: () => void;
  deleteAccount?: () => void;
}

export interface IIngredients {
  listedIngredients: string;

  labelTheToxicIngredient?: () => void;
  identifyTheNaturalOfSynthericOrigin?: () => void;
  identifyTheAreaOfBodyBeingEffected?: () => void;
}

export interface ITracking {
  addItemToConsumedList: {};
  dailyCaloriestnTake: number;
  dailyToxicIngredientIntake: string;

  caloriesItemOverRecommendation?: () => void;
  caloriesItemBelowRecommendation?: () => void;
  adviceDependingGoal?: () => void;
  sideEffectsOfToxicIngredientLongTermintake?: () => void;
}

export interface IDNATest {
  genetics: string;
  healthConditions: string;

  dietRecommendationDependingDNA?: () => void;
  toxicIngredientWarningDependingDNA?: () => void;
}

export interface INutrionFact {
  listedLabelNames: string;
  listedLabelValues: number;

  compareEachNameNValueWithDailyRecommendation?: () => void;
}

export interface IModalCustom {
  visible: boolean;
  close: () => void;
  callback?: (data: any) => void;
  title?: string;
  extraData?: any;
}

export interface IModalReportScan extends IModalCustom {
  rescan?: () => void;
}

export interface IModalCalendar extends IModalCustom {
  activeDates: string[];
}

export enum EStatus {
  INIT = 0,
  LOADING = 1,
  SUCCESS = 2,
  FAIL,
}
