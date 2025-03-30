import { IGenericComponent } from "./components";

export interface IImage extends IGenericComponent {
  forceColor?: string;
  forceOpacity?: 0 | 25 | 50 | 75 | 100; // Level of opacity based on Bootstrap's opacity utility classes
}
