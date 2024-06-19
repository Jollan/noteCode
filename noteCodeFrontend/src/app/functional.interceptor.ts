import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from './services/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = LoaderService.instance;
  loaderService.loaded.set(false);
  return next(req).pipe(
    finalize(() => {
      loaderService.loaded.set(true);
    })
  );
};
