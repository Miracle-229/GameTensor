# Diff Details

Date : 2024-06-14 09:46:45

Directory d:\\work\\programming228\\web\\game-tensor

Total : 109 files,  4535 codes, -11 comments, 364 blanks, all 4888 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [next.config.js](/next.config.js) | JavaScript | 1 | 0 | 0 | 1 |
| [package-lock.json](/package-lock.json) | JSON | 731 | 0 | 0 | 731 |
| [package.json](/package.json) | JSON | 7 | 0 | 0 | 7 |
| [src/components/Alert.tsx](/src/components/Alert.tsx) | TypeScript JSX | 29 | 0 | 6 | 35 |
| [src/components/CardAds.tsx](/src/components/CardAds.tsx) | TypeScript JSX | 62 | 1 | -1 | 62 |
| [src/components/FollowModal.tsx](/src/components/FollowModal.tsx) | TypeScript JSX | 20 | 0 | 0 | 20 |
| [src/components/Header.tsx](/src/components/Header.tsx) | TypeScript JSX | 91 | 0 | 6 | 97 |
| [src/components/Search.tsx](/src/components/Search.tsx) | TypeScript JSX | 17 | 0 | 1 | 18 |
| [src/components/Sidebar.tsx](/src/components/Sidebar.tsx) | TypeScript JSX | 7 | 0 | 0 | 7 |
| [src/components/TagsSearch.tsx](/src/components/TagsSearch.tsx) | TypeScript JSX | 17 | -1 | 1 | 17 |
| [src/helper/Constants/timeFunctions.ts](/src/helper/Constants/timeFunctions.ts) | TypeScript | 20 | 1 | 5 | 26 |
| [src/helper/Types/game.ts](/src/helper/Types/game.ts) | TypeScript | 40 | 0 | 4 | 44 |
| [src/helper/alertHooks.ts](/src/helper/alertHooks.ts) | TypeScript | 28 | 1 | 6 | 35 |
| [src/interceptors/api.ts](/src/interceptors/api.ts) | TypeScript | -1 | 0 | 1 | 0 |
| [src/layouts/Layout.tsx](/src/layouts/Layout.tsx) | TypeScript JSX | 6 | 0 | -2 | 4 |
| [src/layouts/RegistrationLayout.tsx](/src/layouts/RegistrationLayout.tsx) | TypeScript JSX | 12 | 0 | 0 | 12 |
| [src/middleware.ts](/src/middleware.ts) | TypeScript | 45 | 0 | 4 | 49 |
| [src/pages/ad/[adId].tsx](/src/pages/ad/%5BadId%5D.tsx) | TypeScript JSX | 127 | 0 | 10 | 137 |
| [src/pages/ad/create.tsx](/src/pages/ad/create.tsx) | TypeScript JSX | 49 | 0 | 3 | 52 |
| [src/pages/ad/edit/[adId].tsx](/src/pages/ad/edit/%5BadId%5D.tsx) | TypeScript JSX | 312 | 2 | 27 | 341 |
| [src/pages/admin/approve.tsx](/src/pages/admin/approve.tsx) | TypeScript JSX | 109 | -9 | 7 | 107 |
| [src/pages/admin/block.tsx](/src/pages/admin/block.tsx) | TypeScript JSX | 34 | 0 | 3 | 37 |
| [src/pages/admin/create.tsx](/src/pages/admin/create.tsx) | TypeScript JSX | 51 | 0 | 1 | 52 |
| [src/pages/advertisements.tsx](/src/pages/advertisements.tsx) | TypeScript JSX | 49 | 1 | 4 | 54 |
| [src/pages/bookmarks.tsx](/src/pages/bookmarks.tsx) | TypeScript JSX | 42 | 0 | 3 | 45 |
| [src/pages/chat.tsx](/src/pages/chat.tsx) | TypeScript JSX | 319 | 4 | 22 | 345 |
| [src/pages/chat/[chatId].tsx](/src/pages/chat/%5BchatId%5D.tsx) | TypeScript JSX | 35 | 0 | 4 | 39 |
| [src/pages/index.tsx](/src/pages/index.tsx) | TypeScript JSX | 14 | -3 | 1 | 12 |
| [src/pages/login.tsx](/src/pages/login.tsx) | TypeScript JSX | 56 | 1 | 5 | 62 |
| [src/pages/registration.tsx](/src/pages/registration.tsx) | TypeScript JSX | 50 | 0 | 3 | 53 |
| [src/pages/user/[login].tsx](/src/pages/user/%5Blogin%5D.tsx) | TypeScript JSX | 327 | 0 | 20 | 347 |
| [src/pages/user/[userId].tsx](/src/pages/user/%5BuserId%5D.tsx) | TypeScript JSX | -91 | 0 | -4 | -95 |
| [src/pages/user/settings.tsx](/src/pages/user/settings.tsx) | TypeScript JSX | 68 | 0 | 1 | 69 |
| [src/store/ads/adsSlice.ts](/src/store/ads/adsSlice.ts) | TypeScript | 29 | 0 | 0 | 29 |
| [src/store/ads/adsThunk.ts](/src/store/ads/adsThunk.ts) | TypeScript | 3 | -14 | 0 | -11 |
| [src/store/changePassword/changePasswordSelector.ts](/src/store/changePassword/changePasswordSelector.ts) | TypeScript | 15 | 0 | 5 | 20 |
| [src/store/changePassword/changePasswordSlice.ts](/src/store/changePassword/changePasswordSlice.ts) | TypeScript | 43 | 0 | 4 | 47 |
| [src/store/changePassword/changePasswordThunk.ts](/src/store/changePassword/changePasswordThunk.ts) | TypeScript | 24 | 0 | 2 | 26 |
| [src/store/createAd/createAdSelector.ts](/src/store/createAd/createAdSelector.ts) | TypeScript | 11 | 0 | 4 | 15 |
| [src/store/createAd/createAdSlice.ts](/src/store/createAd/createAdSlice.ts) | TypeScript | 29 | 0 | 4 | 33 |
| [src/store/createAd/createAdThunk.ts](/src/store/createAd/createAdThunk.ts) | TypeScript | 18 | 0 | 2 | 20 |
| [src/store/createChat/createChatSlice.ts](/src/store/createChat/createChatSlice.ts) | TypeScript | 32 | 0 | 4 | 36 |
| [src/store/createChat/createChatThunk.ts](/src/store/createChat/createChatThunk.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [src/store/createMessage/createMessageSlice.ts](/src/store/createMessage/createMessageSlice.ts) | TypeScript | 28 | 0 | 4 | 32 |
| [src/store/createMessage/createMessageThunk.ts](/src/store/createMessage/createMessageThunk.ts) | TypeScript | 17 | 0 | 2 | 19 |
| [src/store/currentUser/currentUserThunk.ts](/src/store/currentUser/currentUserThunk.ts) | TypeScript | -1 | 0 | 0 | -1 |
| [src/store/deleteBookmark/deleteBookmarkSlice.ts](/src/store/deleteBookmark/deleteBookmarkSlice.ts) | TypeScript | 28 | 0 | 4 | 32 |
| [src/store/deleteBookmark/deleteBookmarkThunk.ts](/src/store/deleteBookmark/deleteBookmarkThunk.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/store/editAd/editAdSelector.ts](/src/store/editAd/editAdSelector.ts) | TypeScript | 11 | 0 | 4 | 15 |
| [src/store/editAd/editAdSlice.ts](/src/store/editAd/editAdSlice.ts) | TypeScript | 29 | 0 | 4 | 33 |
| [src/store/editAd/editAdThunk.ts](/src/store/editAd/editAdThunk.ts) | TypeScript | 18 | 0 | 2 | 20 |
| [src/store/getBookmark/getBookmarkSelector.ts](/src/store/getBookmark/getBookmarkSelector.ts) | TypeScript | 15 | 0 | 5 | 20 |
| [src/store/getBookmark/getBookmarkSlice.ts](/src/store/getBookmark/getBookmarkSlice.ts) | TypeScript | 61 | 0 | 5 | 66 |
| [src/store/getBookmark/getBookmarkThunk.ts](/src/store/getBookmark/getBookmarkThunk.ts) | TypeScript | 11 | 0 | 2 | 13 |
| [src/store/getChats/getChatsSelector.ts](/src/store/getChats/getChatsSelector.ts) | TypeScript | 6 | 0 | 5 | 11 |
| [src/store/getChats/getChatsSlice.ts](/src/store/getChats/getChatsSlice.ts) | TypeScript | 59 | 1 | 6 | 66 |
| [src/store/getChats/getChatsThunk.ts](/src/store/getChats/getChatsThunk.ts) | TypeScript | 11 | 0 | 2 | 13 |
| [src/store/getMessages/getMessagesSelector.ts](/src/store/getMessages/getMessagesSelector.ts) | TypeScript | 15 | 0 | 5 | 20 |
| [src/store/getMessages/getMessagesSlice.ts](/src/store/getMessages/getMessagesSlice.ts) | TypeScript | 69 | 1 | 6 | 76 |
| [src/store/getMessages/getMessagesThunk.ts](/src/store/getMessages/getMessagesThunk.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/store/getNotifCount/getNotifCountSelector.ts](/src/store/getNotifCount/getNotifCountSelector.ts) | TypeScript | 15 | 0 | 5 | 20 |
| [src/store/getNotifCount/getNotifCountSlice.ts](/src/store/getNotifCount/getNotifCountSlice.ts) | TypeScript | 41 | 1 | 6 | 48 |
| [src/store/getNotifCount/getNotifCountThunk.ts](/src/store/getNotifCount/getNotifCountThunk.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/store/getNotif/getNotifSelector.ts](/src/store/getNotif/getNotifSelector.ts) | TypeScript | 6 | 0 | 5 | 11 |
| [src/store/getNotif/getNotifSlice.ts](/src/store/getNotif/getNotifSlice.ts) | TypeScript | 62 | 1 | 6 | 69 |
| [src/store/getNotif/getNotifThunk.ts](/src/store/getNotif/getNotifThunk.ts) | TypeScript | 11 | 0 | 2 | 13 |
| [src/store/getUserName/getUserNameSelector.ts](/src/store/getUserName/getUserNameSelector.ts) | TypeScript | 15 | 0 | 5 | 20 |
| [src/store/getUserName/getUserNameSlice.ts](/src/store/getUserName/getUserNameSlice.ts) | TypeScript | 46 | 1 | 6 | 53 |
| [src/store/getUserName/getUserNameThunk.ts](/src/store/getUserName/getUserNameThunk.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/store/getUsers/getUsersSelector.ts](/src/store/getUsers/getUsersSelector.ts) | TypeScript | 6 | 0 | 5 | 11 |
| [src/store/getUsers/getUsersSlice.ts](/src/store/getUsers/getUsersSlice.ts) | TypeScript | 41 | 0 | 5 | 46 |
| [src/store/getUsers/getUsersThunk.ts](/src/store/getUsers/getUsersThunk.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/store/imageId/imageThunk.ts](/src/store/imageId/imageThunk.ts) | TypeScript | -1 | 0 | 0 | -1 |
| [src/store/login/loginSelector.ts](/src/store/login/loginSelector.ts) | TypeScript | -9 | 0 | 0 | -9 |
| [src/store/login/loginSlice.ts](/src/store/login/loginSlice.ts) | TypeScript | 8 | 0 | -1 | 7 |
| [src/store/login/loginThunk.ts](/src/store/login/loginThunk.ts) | TypeScript | 6 | 0 | 0 | 6 |
| [src/store/onSubscribe/onSubscribeSlice.ts](/src/store/onSubscribe/onSubscribeSlice.ts) | TypeScript | 29 | 0 | 4 | 33 |
| [src/store/onSubscribe/onSubscribeThunk.ts](/src/store/onSubscribe/onSubscribeThunk.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/store/patchStatusAd/patchStatusSelectorAd.ts](/src/store/patchStatusAd/patchStatusSelectorAd.ts) | TypeScript | 17 | 0 | 2 | 19 |
| [src/store/patchStatusAd/patchStatusSlice.ts](/src/store/patchStatusAd/patchStatusSlice.ts) | TypeScript | 28 | 0 | 4 | 32 |
| [src/store/patchStatusUser/patchStatusUserSlice.ts](/src/store/patchStatusUser/patchStatusUserSlice.ts) | TypeScript | 28 | 0 | 4 | 32 |
| [src/store/patchStatusUser/patchStatusUserThunk.ts](/src/store/patchStatusUser/patchStatusUserThunk.ts) | TypeScript | 17 | 0 | 2 | 19 |
| [src/store/pathStatusNotif/pathStatusNotifSlice.ts](/src/store/pathStatusNotif/pathStatusNotifSlice.ts) | TypeScript | 28 | 0 | 4 | 32 |
| [src/store/pathStatusNotif/pathStatusNotifThunk.ts](/src/store/pathStatusNotif/pathStatusNotifThunk.ts) | TypeScript | 17 | 0 | 2 | 19 |
| [src/store/postBookmark/postBookmarkSlice.ts](/src/store/postBookmark/postBookmarkSlice.ts) | TypeScript | 28 | 0 | 4 | 32 |
| [src/store/postBookmark/postBookmarkThunk.ts](/src/store/postBookmark/postBookmarkThunk.ts) | TypeScript | 16 | 0 | 2 | 18 |
| [src/store/postTag/postTagSelector.ts](/src/store/postTag/postTagSelector.ts) | TypeScript | 15 | 0 | 5 | 20 |
| [src/store/postTag/postTagSlice.ts](/src/store/postTag/postTagSlice.ts) | TypeScript | 43 | 0 | 4 | 47 |
| [src/store/postTag/postTagThunk.ts](/src/store/postTag/postTagThunk.ts) | TypeScript | 20 | 0 | 2 | 22 |
| [src/store/registration/registrationSlice.ts](/src/store/registration/registrationSlice.ts) | TypeScript | 7 | 0 | 0 | 7 |
| [src/store/registration/registrationThunk.ts](/src/store/registration/registrationThunk.ts) | TypeScript | 4 | 0 | 0 | 4 |
| [src/store/search/searchSlice.ts](/src/store/search/searchSlice.ts) | TypeScript | 29 | 0 | 0 | 29 |
| [src/store/search/searchThunk.ts](/src/store/search/searchThunk.ts) | TypeScript | -8 | -1 | 0 | -9 |
| [src/store/store.ts](/src/store/store.ts) | TypeScript | 40 | 0 | 0 | 40 |
| [src/store/subscribe/subscribeSlice.ts](/src/store/subscribe/subscribeSlice.ts) | TypeScript | 29 | 0 | 4 | 33 |
| [src/store/subscribe/subscribeThunk.ts](/src/store/subscribe/subscribeThunk.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/styles/AdminApprove.module.scss](/src/styles/AdminApprove.module.scss) | SCSS | 25 | 0 | 2 | 27 |
| [src/styles/AdminBlock.module.scss](/src/styles/AdminBlock.module.scss) | SCSS | 34 | 0 | 0 | 34 |
| [src/styles/Advertisements.module.scss](/src/styles/Advertisements.module.scss) | SCSS | 25 | 0 | 2 | 27 |
| [src/styles/Alerts.module.scss](/src/styles/Alerts.module.scss) | SCSS | 35 | 0 | 7 | 42 |
| [src/styles/Bookmarks.module.scss](/src/styles/Bookmarks.module.scss) | SCSS | 18 | 0 | 1 | 19 |
| [src/styles/CardAds.module.scss](/src/styles/CardAds.module.scss) | SCSS | 20 | 0 | 0 | 20 |
| [src/styles/Chat.module.scss](/src/styles/Chat.module.scss) | SCSS | 189 | 1 | 16 | 206 |
| [src/styles/Dialog.module.scss](/src/styles/Dialog.module.scss) | SCSS | 43 | 0 | 8 | 51 |
| [src/styles/GameId.module.scss](/src/styles/GameId.module.scss) | SCSS | 54 | 0 | 1 | 55 |
| [src/styles/Header.module.scss](/src/styles/Header.module.scss) | SCSS | 26 | 0 | 1 | 27 |
| [src/styles/Home.module.scss](/src/styles/Home.module.scss) | SCSS | 1 | 0 | 0 | 1 |
| [src/styles/UserId.module.scss](/src/styles/UserId.module.scss) | SCSS | 52 | 0 | 0 | 52 |
| [src/styles/globals.css](/src/styles/globals.css) | CSS | 4 | 0 | 1 | 5 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details