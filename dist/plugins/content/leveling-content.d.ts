export namespace levelingMessages {
    function levelUpCongrats(userName: any, level: any, role: any, date: any): string;
    function newRankNotification(userName: any, newRank: any, nextRank: any, nextRankLevel: any): string;
    function levelUpChannelNotification(userName: any, previousLevel: any, currentLevel: any, role: any): string;
    function rewardNotification(amount: any, type: any): string;
    function levelReward(level: any, rewards: any): string;
    let channelNotificationTitle: string;
    let channelNotificationBodyLevelUp: string;
    let channelNotificationBodyNewRank: string;
}
//# sourceMappingURL=leveling-content.d.ts.map