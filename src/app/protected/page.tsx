'use client';
import LogoutButton from "@/components/LogoutButton";
import withAuth from "@/services/withAuth";

type ProtectedPageProps = {
    // Các prop của trang bảo vệ
};

const ProtectedPage = (props: ProtectedPageProps) => {
    return <div>Nội dung trang bảo vệ <LogoutButton /></div>;
};

export default withAuth(ProtectedPage);