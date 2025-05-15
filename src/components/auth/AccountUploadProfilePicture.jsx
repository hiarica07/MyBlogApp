import { useState } from "react"
import { Box, Typography, Avatar, Button } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

const AccountUploadProfilePicture = ({ singleUser }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  // Example function - will be replaced with actual implementation
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsUploading(true)

    // Create a preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)

    // In a real application, you would upload the file to your API
    // await uploadProfilePicture(id, file)

    // Simulate API call
    setTimeout(() => {
      setIsUploading(false)
    }, 1000)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "flex-start", gap: 4, mb: 4 }}>
      <Typography variant="h6" fontWeight="500">
        {singleUser?.firstName} {singleUser?.lastName}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Avatar
          src={previewUrl || singleUser?.profilePicture}
          alt="Profile"
          sx={{
            width: 80,
            height: 80,
            border: 2,
            borderColor: "primary.main",
          }}
        />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            component="label"
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            disabled={isUploading}
            sx={{ textTransform: "none" }}
          >
            {isUploading ? "Uploading..." : "Upload"}
            <input type="file" accept="image/*" hidden onChange={handleFileUpload} />
          </Button>
          <Typography variant="caption" color="text.secondary">
            For best results, upload an image 512x512 or larger.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default AccountUploadProfilePicture