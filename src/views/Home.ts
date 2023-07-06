import '@components/InputText/index.ts'
import '@components/InputPassword/index.ts'
import '@components/AvatarPicker/index.ts'
import '@components/NavigationGuide/index.ts'
import '@components/ButtonElement/index.ts'

// const items = [
//   {
//     icon: '/icons/greeting.svg',
//     title: 'General Data'
//   },
//   {
//     icon: '/icons/user.svg',
//     title: 'Profile Type'
//   },
//   {
//     icon: '/icons/business.svg',
//     title: 'Tax Information'
//   }
// ]

// <input-password id="password" label="Password" name="password" required></input-password>
// <avatar-picker label="Choose your profile image" id="profile-image" name="profile-image"></avatar-picker>
// <input-text max-width="600px" id="name" label="Name" type="text" name="name" validation="email" required></input-text>

// <navigation-guide items=${encodeURIComponent(
//   JSON.stringify(items)
// )} activeIndex="0" completedIndex="1" completedIcon="/icons/check.svg"></navigation-guide>

export function Home() {
  return /* html */ `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; min-width: 100vw;">
    <div style="flex-direction: column;  width:500px;">
        <button-element>Next</button-element>
        </div>
    </div>
  `
}
