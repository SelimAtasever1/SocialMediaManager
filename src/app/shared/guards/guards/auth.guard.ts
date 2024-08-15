import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthenticated().pipe(
        take(1),
        map(isAuthenticated => {
            if (!isAuthenticated) {
                router.navigate(['/auth']);
                return false;
            }
            return true;
        })
    );
};
