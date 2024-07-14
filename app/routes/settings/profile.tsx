import { json, useLoaderData } from '@remix-run/react'

export const loader = () => {
  return json({ message: 'Yo' })
}

const ProfileSettingTab = () => {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Profile Settings</h1>
      <p>These are the profile settings</p>
      <p>Message: {data.message}</p>
    </div>
  )
}

export default ProfileSettingTab
