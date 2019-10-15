import { switchMap } from "rxjs/operators";

export function createStaticPathObservable(path, distance$) {
  const _path = [...path];

  return distance$.pipe(
    switchMap(currDistance => {
      let pathItems = [];

      while (_path.length > 0 && _path[0].distance <= currDistance) {
        pathItems.push(_path.shift());
      }

      return pathItems;
    })
  );
}

export function generateRandomPath() {
  let path = [];
  let offset = 0;

  for (let i = 0; i < 47; i += 1) {
    path.push({ distance: offset + i * 0.05, type: "junction" });
  }

  return path;
}
