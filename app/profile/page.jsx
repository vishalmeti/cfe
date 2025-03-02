'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Phone, Mail, Calendar, Hash, Key, Edit2, Save, X, AlertCircle, Shield, Upload, Camera } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import UserService from '@/services/userService';

const UserProfilePage = () => {
  // Initial user data
  // Use a function in useState to ensure it only runs once during initialization
// const [userData, setUserData] = useState(() => {
//     return  || {}
//   });

    const [userData, setUserData] = useState({
        "id": 0,
        "custom_id": "",
        "username": "",
        "email": "",
        "is_active": true,
        "role": "",
        "phone": null,
        "last_login": null,
        "profile_image_url": null,
        "date_joined": "",
        "first_name": "",
        "last_name": "",
        "full_name": " "
    });

//   const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({...userData});
  const [activeField, setActiveField] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [blob, setBlob] = useState(null)
  const fileInputRef = useRef(null);

    useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      const response = await UserService.getCurrentUser();
        setUserData(response);
        setFormData(response);
    };

    fetchUserData();
  }
  , []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSwitchChange = (checked) => {
    setFormData({
      ...formData,
      is_active: checked
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
        // const blob = new Blob([file], { type: file.type });
        setBlob(file); // Store the file object
        console.log("FIle set to blob", file);
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setShowImageModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

    const handleSaveImage = () => {
    // Update only the profile image
    if (previewImage) {
    //   const updatedUserData = {
    //     ...userData,
    //     profile_image_url: previewImage
    //   };
      
    //   setUserData(updatedUserData);
      setPreviewImage(null);
      
      // Here you would typically send the updated image to your backend
      let payload = new FormData();
    
      // Use the original file/blob with its filename
      payload.append('file', blob, blob.name); // Include filename from fileObject
      payload.append('isProfile', 'true');
      payload.append('objectId', formData.id.toString());
      payload.append('modelName', 'user');
      
      // Log FormData contents (debug only)
      for (let pair of payload.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      UserService.updateProfileImage(payload).then((response) => {
        console.log(response);
      }).catch(error => {
        console.error("Error uploading image:", error);
      });
    //   alert("Profile photo updated successfully!");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSaveDetails = () => {
    // Save only the form data without touching the profile image
    setUserData({
      ...userData,
      ...formData
    });
    setEditMode(false);
    
    // Here you would typically send the updated data to your backend
    console.log("Saving user details:", formData);
    
    // alert("Profile details updated successfully!");
  };


  const handleCancelEdit = () => {
    setFormData({...userData});
    setEditMode(false);
  };

  const confirmImageUpload = () => {
    handleSaveImage();
    setShowImageModal(false);
  };

  const cancelImageUpload = () => {
    setPreviewImage(null);
    setShowImageModal(false);
  };

  const getRoleColor = (role) => {
    const roles = {
      'admin': 'bg-red-100 text-red-800',
      'resident': 'bg-blue-100 text-blue-800',
      'manager': 'bg-purple-100 text-purple-800',
      'guest': 'bg-green-100 text-green-800'
    };
    
    return roles[role] || 'bg-gray-100 text-gray-800';
  };

  // Get the current display image
  const displayImageUrl = userData.profile_image_url;

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Preview Profile Image</h3>
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48 border-4 border-blue-100 rounded-full overflow-hidden">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={cancelImageUpload}>
                Cancel
              </Button>
              <Button onClick={confirmImageUpload}>
                Use This Image
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Profile Header - Enhanced Image Display */}
        <div className="w-full lg:w-1/3">
          <Card className="overflow-hidden">
            <div className="h-15 w-full bg-gradient-to-r   relative">
              {/* Hero image section above profile picture */}
            </div>
            <div className="px-6 pb-6 relative">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <div className="relative group">
                  {/* Larger avatar */}
                  <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                    <img
                      src={displayImageUrl}
                      alt={userData.username}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/128/128"; // Fallback image
                        e.target.alt = userData.username.substring(0, 2).toUpperCase();
                      }}
                    />
                  </div>
                  
                  {/* Modern hover overlay for photo upload */}
                  <div 
                    className="absolute inset-0  group-hover:bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200"
                    onClick={triggerFileInput}
                  >
                    <div className="bg-white p-2 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 shadow-lg">
                      <Camera className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
              </div>
              
              <div className="mt-20 text-center">
                <h2 className="text-2xl font-bold">{userData.full_name?.trim() || userData.username}</h2>
                <div className="flex items-center justify-center mt-1">
                  <Badge className={`${getRoleColor(userData.role)}`}>{userData.role}</Badge>
                  <span className={`ml-2 flex items-center text-sm ${userData.is_active ? "text-green-600" : "text-red-600"}`}>
                    <div className={`h-2 w-2 rounded-full mr-1 ${userData.is_active ? "bg-green-600" : "bg-red-600"}`}></div>
                    {userData.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">{userData.phone || "No phone number"}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">Joined: {formatDate(userData.date_joined).split(',')[0]}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Profile Details */}
        <div className="w-full lg:w-2/3">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="details" className="flex-1 max-w-[200px]">Profile Details</TabsTrigger>
              <TabsTrigger value="activity" className="flex-1 max-w-[200px]">Activity & Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </div>
                  <Button 
                    variant={editMode ? "destructive" : "outline"} 
                    size="sm"
                    onClick={editMode ? handleCancelEdit : () => setEditMode(true)}
                    className="h-9"
                  >
                    {editMode ? (
                      <><X className="h-4 w-4 mr-1" /> Cancel</>
                    ) : (
                      <><Edit2 className="h-4 w-4 mr-1" /> Edit Profile</>
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                      <div className="mt-1 relative">
                        <Input 
                          id="username" 
                          name="username" 
                          value={formData.username} 
                          onChange={handleInputChange} 
                          disabled={!editMode} 
                          className={editMode ? "pr-10" : ""}
                        />
                        {editMode && (
                          <User className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <div className="mt-1 relative">
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          disabled={!editMode} 
                          className={editMode ? "pr-10" : ""}
                        />
                        {editMode && (
                          <Mail className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="first_name" className="text-sm font-medium">First Name</Label>
                      <div className="mt-1">
                        <Input 
                          id="first_name" 
                          name="first_name" 
                          value={formData.first_name} 
                          onChange={handleInputChange} 
                          disabled={!editMode} 
                          placeholder={editMode ? "Enter first name" : "Not set"}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="last_name" className="text-sm font-medium">Last Name</Label>
                      <div className="mt-1">
                        <Input 
                          id="last_name" 
                          name="last_name" 
                          value={formData.last_name} 
                          onChange={handleInputChange} 
                          disabled={!editMode} 
                          placeholder={editMode ? "Enter last name" : "Not set"}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                      <div className="mt-1 relative">
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          value={formData.phone || ""} 
                          onChange={handleInputChange} 
                          disabled={!editMode} 
                          placeholder={editMode ? "Enter phone number" : "Not set"}
                          className={editMode ? "pr-10" : ""}
                        />
                        {editMode && (
                          <Phone className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                      <div className="mt-1 relative">
                        <Input 
                          id="role" 
                          name="role" 
                          value={formData.role} 
                          onChange={handleInputChange} 
                          disabled={!editMode} 
                          className={editMode ? "pr-10" : ""}
                        />
                        {editMode && (
                          <Shield className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="is_active" 
                        checked={formData.is_active} 
                        onCheckedChange={handleSwitchChange}
                        disabled={!editMode} 
                      />
                      <Label htmlFor="is_active" className="text-sm font-medium">Active Account</Label>
                    </div>
                  </div>
                </CardContent>
                {editMode && (
                  <CardFooter className="flex justify-end border-t pt-4">
                    <Button onClick={handleSaveDetails}>
                      <Save className="h-4 w-4 mr-2" /> Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle>Account Details</CardTitle>
                  <CardDescription>System and account information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Key className="h-4 w-4 mr-2 text-gray-500" />
                          <Label className="text-sm font-medium">Custom ID</Label>
                        </div>
                        <span className="text-sm font-mono bg-gray-100 py-1 px-2 rounded">{userData.custom_id}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <Label className="text-sm font-medium">Date Joined</Label>
                        </div>
                        <span className="text-sm">{formatDate(userData.date_joined)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <Label className="text-sm font-medium">Last Login</Label>
                        </div>
                        <span className="text-sm">{formatDate(userData.last_login)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>Recent account activity and login history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-10">
                    <div className="text-center space-y-3">
                      <AlertCircle className="h-10 w-10 text-gray-400 mx-auto" />
                      <p className="text-lg font-medium">No recent activity</p>
                      <p className="text-sm text-gray-500">Login history and activity logs will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;