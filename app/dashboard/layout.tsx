import { AuthGuard } from "@/components/auth";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard requireAuth={true} redirectTo="/login">
            <div>{children}</div>
        </AuthGuard>
    );
}
