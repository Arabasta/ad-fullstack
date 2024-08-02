import UpdatePassword from "../../components/user/UserUpdatePassword";
import UpdateEmail from "../../components/user/UserUpdateEmail";
import useUser from "../../hooks/useUser";

const AccountPage = () => {
    const { user, setUser } = useUser();

    return (
        <div>
            <h2>Account Settings</h2>
            <UpdateEmail user={user} setUser={setUser} />
            <UpdatePassword user={user} setUser={setUser} />
        </div>
    );
};

export default AccountPage;
