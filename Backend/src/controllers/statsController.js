import StatsService from "../services/statsService.js";
import { catchAsynErrors } from "../middlewares/catchAsyncErrors.js";

const statsService = new StatsService();

const getHomePageStats = catchAsynErrors(async (req, res, next) => {
    const stats = await statsService.getHomepageStats();
    res.status(200).json({
        success: true,
        data: stats
    });
});

export {
    getHomePageStats
}
