import { $count } from "./count.state";

export function listenToCount(callback: (value: number) => void) {
  $count.listen(callback);
}