export declare const adminGroupsMessages: {
    autodetect: {
        groupNameChanged: (user: string, newName: string) => string;
        groupPhotoChanged: (user: string) => string;
        groupLinkReset: (user: string) => string;
        groupSettingsAdjusted: (user: string, state: "on" | "off") => string;
        groupStatusChanged: (user: string, state: "on" | "off") => string;
        adminPromoted: (adminUser: string, promotedUser: string) => string;
        adminDemoted: (adminUser: string, demotedUser: string) => string;
    };
    addParticipant: {
        description: string;
        noTarget: string;
        noPlus: string;
        invalidNumber: string;
        restrict: (smsAvisoAG: string, smsSoloOwner: string) => string;
        inviteSent: (targetNumber: string) => string;
        added: (targetNumber: string, smsAdd2: string) => string;
        addError: (targetNumber: string, status: string) => string;
        error: string;
        inviteMessage: (groupLink: string, smsAdd: string) => string;
    };
    admins: {
        description: string;
        noText: (smsAvisoMG: string) => string;
        header: (pesan: string, smsAddB5: string) => string;
        body: (listAdmin: string, smsAddB4: string) => string;
        title: (smsAddB3: string) => string;
        template: (title: string, header: string, body: string, vs: string) => string;
        error: string;
    };
    banBot: {
        description: string;
        alreadyBanned: string;
        banned: string;
        alreadyOff: string;
        off: string;
        error: string;
        notAdmin: string;
    };
    checkExpired: {
        description: string;
        notSet: string;
        notSetTarget: (targetChatId: string) => string;
        expired: string;
        expiresIn: (formattedTime: string) => string;
        error: string;
        msToDate: (ms: number) => string;
    };
    deleteMessage: {
        description: string;
        noQuoted: string;
        noInfo: string;
        error: string;
    };
    deleteSession: {
        description: string;
        notOnMainBot: string;
        noFiles: string;
        deleted: (filesDeleted: number) => string;
        error: string;
        hello: string;
    };
    demote: {
        description: string;
        noTarget: string;
        success: (user: string) => string;
        error: string;
    };
    destraba: {
        description: string;
    };
};
//# sourceMappingURL=messages.d.ts.map