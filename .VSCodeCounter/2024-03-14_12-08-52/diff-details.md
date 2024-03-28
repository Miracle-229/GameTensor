# Diff Details

Date : 2024-03-14 12:08:52

Directory d:\\work\\programming228\\web\\game-tensor

Total : 64 files,  2291 codes, 159 comments, 104 blanks, all 2554 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.eslintrc.js](/.eslintrc.js) | JavaScript | 1 | 0 | 0 | 1 |
| [next.config.js](/next.config.js) | JavaScript | 1 | 0 | 0 | 1 |
| [package-lock.json](/package-lock.json) | JSON | 855 | 0 | 0 | 855 |
| [package.json](/package.json) | JSON | 5 | 0 | 0 | 5 |
| [src/components/CardAds.tsx](/src/components/CardAds.tsx) | TypeScript JSX | 2 | 0 | -1 | 1 |
| [src/components/Header.tsx](/src/components/Header.tsx) | TypeScript JSX | 45 | 0 | -1 | 44 |
| [src/components/Search.tsx](/src/components/Search.tsx) | TypeScript JSX | 8 | 0 | 1 | 9 |
| [src/components/Sidebar.tsx](/src/components/Sidebar.tsx) | TypeScript JSX | 60 | 2 | 7 | 69 |
| [src/components/TagsSearch.tsx](/src/components/TagsSearch.tsx) | TypeScript JSX | 5 | 2 | 2 | 9 |
| [src/helper/Constants/mockAds.ts](/src/helper/Constants/mockAds.ts) | TypeScript | 12 | 135 | 0 | 147 |
| [src/helper/Constants/mockFollow.ts](/src/helper/Constants/mockFollow.ts) | TypeScript | -6 | 0 | -1 | -7 |
| [src/helper/Constants/mockImagesTags.ts](/src/helper/Constants/mockImagesTags.ts) | TypeScript | 7 | 0 | 1 | 8 |
| [src/helper/Constants/mockUsers.ts](/src/helper/Constants/mockUsers.ts) | TypeScript | 10 | 0 | 1 | 11 |
| [src/helper/Types/game.ts](/src/helper/Types/game.ts) | TypeScript | 17 | 0 | 3 | 20 |
| [src/interceptors/api.ts](/src/interceptors/api.ts) | TypeScript | 53 | 6 | 7 | 66 |
| [src/layouts/AdminLayot.tsx](/src/layouts/AdminLayot.tsx) | TypeScript JSX | 19 | 0 | 2 | 21 |
| [src/layouts/Layout.tsx](/src/layouts/Layout.tsx) | TypeScript JSX | 17 | 2 | 2 | 21 |
| [src/pages/ad/[adId].tsx](/src/pages/ad/%5BadId%5D.tsx) | TypeScript JSX | 123 | 23 | 6 | 152 |
| [src/pages/ad/[id].tsx](/src/pages/ad/%5Bid%5D.tsx) | TypeScript JSX | -119 | -22 | -4 | -145 |
| [src/pages/ad/create.tsx](/src/pages/ad/create.tsx) | TypeScript JSX | 72 | 0 | 6 | 78 |
| [src/pages/admin/approve.tsx](/src/pages/admin/approve.tsx) | TypeScript JSX | 96 | 11 | 9 | 116 |
| [src/pages/admin/block.tsx](/src/pages/admin/block.tsx) | TypeScript JSX | 61 | 0 | 5 | 66 |
| [src/pages/admin/create.tsx](/src/pages/admin/create.tsx) | TypeScript JSX | 15 | 0 | 3 | 18 |
| [src/pages/advertisements.tsx](/src/pages/advertisements.tsx) | TypeScript JSX | 52 | 0 | 5 | 57 |
| [src/pages/index.tsx](/src/pages/index.tsx) | TypeScript JSX | -22 | 0 | 0 | -22 |
| [src/pages/login.tsx](/src/pages/login.tsx) | TypeScript JSX | 28 | 0 | 1 | 29 |
| [src/pages/registration.tsx](/src/pages/registration.tsx) | TypeScript JSX | 33 | -1 | 0 | 32 |
| [src/pages/user/[userId].tsx](/src/pages/user/%5BuserId%5D.tsx) | TypeScript JSX | 91 | 0 | 4 | 95 |
| [src/pages/user/id.tsx](/src/pages/user/id.tsx) | TypeScript JSX | -46 | 0 | -3 | -49 |
| [src/store/ads/adsSelector.ts](/src/store/ads/adsSelector.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [src/store/ads/adsSlice.ts](/src/store/ads/adsSlice.ts) | TypeScript | -1 | 0 | -1 | -2 |
| [src/store/ads/adsThunk.ts](/src/store/ads/adsThunk.ts) | TypeScript | 12 | -1 | -2 | 9 |
| [src/store/currentUser/currentUserSelector.ts](/src/store/currentUser/currentUserSelector.ts) | TypeScript | 15 | 0 | 5 | 20 |
| [src/store/currentUser/currentUserSlice.ts](/src/store/currentUser/currentUserSlice.ts) | TypeScript | 46 | 1 | 6 | 53 |
| [src/store/currentUser/currentUserThunk.ts](/src/store/currentUser/currentUserThunk.ts) | TypeScript | 15 | 0 | 2 | 17 |
| [src/store/id/idSlice.ts](/src/store/id/idSlice.ts) | TypeScript | -1 | 0 | -1 | -2 |
| [src/store/id/idThunk.ts](/src/store/id/idThunk.ts) | TypeScript | -4 | 0 | 0 | -4 |
| [src/store/imageId/imageSlice.ts](/src/store/imageId/imageSlice.ts) | TypeScript | -1 | 0 | -1 | -2 |
| [src/store/imageId/imageThunk.ts](/src/store/imageId/imageThunk.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/store/login/loginSelector.ts](/src/store/login/loginSelector.ts) | TypeScript | 15 | 0 | 5 | 20 |
| [src/store/login/loginSlice.ts](/src/store/login/loginSlice.ts) | TypeScript | 36 | 0 | 5 | 41 |
| [src/store/login/loginThunk.ts](/src/store/login/loginThunk.ts) | TypeScript | 20 | 0 | 2 | 22 |
| [src/store/logout/logoutSlice.ts](/src/store/logout/logoutSlice.ts) | TypeScript | 32 | 0 | 5 | 37 |
| [src/store/logout/logoutThunk.ts](/src/store/logout/logoutThunk.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/store/registration/registrationSelector.ts](/src/store/registration/registrationSelector.ts) | TypeScript | 15 | 0 | 5 | 20 |
| [src/store/registration/registrationSlice.ts](/src/store/registration/registrationSlice.ts) | TypeScript | 37 | 0 | 4 | 41 |
| [src/store/registration/registrationThunk.ts](/src/store/registration/registrationThunk.ts) | TypeScript | 19 | 0 | 2 | 21 |
| [src/store/search/searchSlice.ts](/src/store/search/searchSlice.ts) | TypeScript | -1 | 0 | -1 | -2 |
| [src/store/search/searchThunk.ts](/src/store/search/searchThunk.ts) | TypeScript | 5 | 1 | 0 | 6 |
| [src/store/store.ts](/src/store/store.ts) | TypeScript | 7 | 0 | -1 | 6 |
| [src/store/tags/tagsSlice.ts](/src/store/tags/tagsSlice.ts) | TypeScript | -1 | 0 | -1 | -2 |
| [src/store/tags/tagsThunk.ts](/src/store/tags/tagsThunk.ts) | TypeScript | -5 | 0 | 0 | -5 |
| [src/styles/AdminApprove.module.scss](/src/styles/AdminApprove.module.scss) | SCSS | 90 | 0 | 2 | 92 |
| [src/styles/AdminBlock.module.scss](/src/styles/AdminBlock.module.scss) | SCSS | 74 | 0 | 1 | 75 |
| [src/styles/Advertisements.module.scss](/src/styles/Advertisements.module.scss) | SCSS | 63 | 0 | 2 | 65 |
| [src/styles/CreateAds.module.scss](/src/styles/CreateAds.module.scss) | SCSS | 3 | 0 | 0 | 3 |
| [src/styles/CreateTag.module.scss](/src/styles/CreateTag.module.scss) | SCSS | 41 | 0 | 1 | 42 |
| [src/styles/FollowModal.module.scss](/src/styles/FollowModal.module.scss) | SCSS | 4 | 0 | 0 | 4 |
| [src/styles/GameId.module.scss](/src/styles/GameId.module.scss) | SCSS | 3 | 0 | 0 | 3 |
| [src/styles/Header.module.scss](/src/styles/Header.module.scss) | SCSS | 35 | 0 | 1 | 36 |
| [src/styles/Sidebar.module.scss](/src/styles/Sidebar.module.scss) | SCSS | 147 | 0 | 4 | 151 |
| [src/styles/TagsSearch.module.scss](/src/styles/TagsSearch.module.scss) | SCSS | 35 | 0 | 0 | 35 |
| [src/styles/UserId.module.scss](/src/styles/UserId.module.scss) | SCSS | 20 | 0 | 1 | 21 |
| [src/styles/globals.css](/src/styles/globals.css) | CSS | 5 | 0 | 1 | 6 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details