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
        botNotAdmin: string;
        senderNotAdmin: string;
        success: string;
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
        message: string;
        error: string;
    };
    adminBan: {
        description: string;
        noAdmin: string;
        noTarget: string;
        notMember: string;
        cannotBanAdmin: string;
        success: (user: string) => string;
        error: (errorMessage: string) => string;
    };
    adminDemote: {
        description: string;
        noTarget: (usedPrefix: string, command: string) => string;
        invalidNumber: string;
        success: string;
        error: string;
    };
    adminKick: {
        description: string;
        noTarget: (usedPrefix: string, command: string) => string;
        noSelfKick: string;
        success: string;
        error: string;
    };
    adminLink: {
        description: string;
        linkMessage: (groupName: string, link: string) => string;
        error: string;
    };
    adminPromote: {
        description: string;
        noTarget: (usedPrefix: string, command: string) => string;
        invalidNumber: string;
        success: string;
        error: string;
    };
    adminSetBye: {
        description: string;
        success: string;
        noText: string;
        error: string;
    };
    adminSetName: {
        description: string;
        noText: string;
        success: string;
        error: string;
    };
    adminSetPP: {
        description: string;
        noImageQuoted: string;
        noImage: string;
        success: string;
        error: (errorMessage: string) => string;
        Error: string;
    };
    adminSetWelcome: {
        description: string;
        success: string;
        noText: string;
        error: string;
    };
    adminSimulate: {
        description: string;
        welcomeNotEnabled: (usedPrefix: string) => string;
        eventList: (usedPrefix: string, command: string) => string;
        simulating: (event: string) => string;
        invalidEvent: string;
        error: string;
    };
    adminBanList: {
        description: string;
        noTarget: string;
        success: (user: string) => string;
        alreadyBanned: (user: string) => string;
        error: string;
    };
    adminCommands: {
        delete: {
            description: string;
            noHash: string;
            locked: string;
            success: string;
            notFound: (hash: string) => string;
            error: string;
        };
        list: {
            description: string;
            noCommands: string;
            header: string;
            info: string;
            separator: string;
            commandLine: (index: number, key: string, value: {
                locked: boolean;
                text: string;
            }) => string;
            error: string;
        };
        set: {
            description: string;
            noQuotedMessage: string;
            noCommandName: string;
            locked: string;
            success: (commandName: string) => string;
            error: string;
        };
    };
};
//# sourceMappingURL=messages.d.ts.map