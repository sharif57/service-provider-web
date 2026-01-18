// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useUpdatePasswordMutation } from "@/redux/feature/authSlice";
// import React, { useState } from "react";

// interface ChangePasswordProps {
//   trigger: React.ReactNode;
// }

// export default function ChangePassword({ trigger }: ChangePasswordProps) {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const [updatePassword] = useUpdatePasswordMutation();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       setError("New password and confirm password do not match.");
//       return;
//     }
//     if (newPassword.length < 8) {
//       setError("New password must be at least 8 characters long.");
//       return;
//     }
//     // Simulate API call
//     console.log({ currentPassword, newPassword, confirmPassword });
//     setCurrentPassword("");
//     setNewPassword("");
//     setConfirmPassword("");
//     setError("");
//     // Add your password change logic here
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>{trigger}</DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Change Password</DialogTitle>
//           <DialogDescription>
//             Update your password here. Ensure it&apos;s secure and click save
//             when done.
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="grid gap-4">
//           <div className="grid gap-3">
//             <Label htmlFor="current-password">Current Password</Label>
//             <Input
//               id="current-password"
//               type="password"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               placeholder="Enter current password"
//               required
//             />
//           </div>
//           <div className="grid gap-3">
//             <Label htmlFor="new-password">New Password</Label>
//             <Input
//               id="new-password"
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               placeholder="Enter new password"
//               required
//             />
//           </div>
//           <div className="grid gap-3">
//             <Label htmlFor="confirm-password">Confirm Password</Label>
//             <Input
//               id="confirm-password"
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm new password"
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button type="submit">Save Changes</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePasswordMutation } from "@/redux/feature/authSlice";
import React, { useState } from "react";
import { toast } from "sonner";

interface ChangePasswordProps {
  trigger: React.ReactNode;
}

export default function ChangePassword({ trigger }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    // === Client-side validations ===
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    try {
      const payload = {
        new_password: newPassword,
        confirm_password: confirmPassword,
      };

      const res = await updatePassword(payload).unwrap();

      toast.success(res?.message || "Password updated successfully!");

      // Reset fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Close dialog automatically
      const closeBtn = document.getElementById("close-password-dialog");
      closeBtn?.click();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update password.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Update your password here. Ensure it's secure and click save when done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
        
          <div className="grid gap-3">
            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="grid gap-3">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" id="close-password-dialog">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
