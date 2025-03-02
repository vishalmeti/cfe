// utils/router.js
import { useRouter } from 'next/router';

const AppRouter = {
    push(url, as, options) {
        const router = useRouter(); // Get the router instance *inside* the function
        return router.push(url, as, options);
    },

    replace(url, as, options) {
        const router = useRouter();
        return router.replace(url, as, options);
    },

    back() {
        const router = useRouter();
        return router.back();
    },

    reload() {
        const router = useRouter();
        return router.reload();
    },

    prefetch(url, as, options) {
        const router = useRouter();
        return router.prefetch(url, as, options);
    },

    // Add other useRouter methods you commonly use (e.g., prefetch, beforePopState)
    beforePopState(cb) {
         const router = useRouter();
         router.beforePopState(cb)
    }
};

export default AppRouter;