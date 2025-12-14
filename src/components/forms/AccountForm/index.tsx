'use client'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Media } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { useRouter } from 'next/navigation'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Image from 'next/image'
import { X, Upload, User as UserIcon } from 'lucide-react'

type FormData = {
  email: string
  name: User['name']
  password: string
  passwordConfirm: string
}

export const AccountForm: React.FC = () => {
  const { setUser, user } = useAuth()
  const [changePassword, setChangePassword] = useState(false)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [removeProfileImage, setRemoveProfileImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    formState: { errors, isLoading, isSubmitting, isDirty },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const router = useRouter()

  // Get current profile image URL
  const getProfileImageUrl = (): string | null => {
    if (removeProfileImage) return null
    if (profileImagePreview) return profileImagePreview
    if (user?.profileImage && typeof user.profileImage === 'object' && user.profileImage.url) {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}${user.profileImage.url}`
    }
    return null
  }

  // Handle file selection
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file.')
        return
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB.')
        return
      }
      setProfileImageFile(file)
      setRemoveProfileImage(false) // Clear remove flag when new file is selected
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  // Remove profile image
  const handleRemoveImage = useCallback(() => {
    setProfileImageFile(null)
    setProfileImagePreview(null)
    setRemoveProfileImage(true)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  // Upload image to Media collection
  const uploadProfileImage = useCallback(async (file: File): Promise<number | null> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt', `Profile image for ${user?.name || user?.email || 'user'}`)

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/media`, {
        body: formData,
        credentials: 'include',
        method: 'POST',
      })

      if (response.ok) {
        const json = await response.json()
        return json.doc.id
      } else {
        const error = await response.json()
        throw new Error(error.errors?.[0]?.message || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }, [user])

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        try {
          let profileImageId: number | null = null

          // Upload new profile image if one was selected
          if (profileImageFile) {
            setIsUploadingImage(true)
            try {
              profileImageId = await uploadProfileImage(profileImageFile)
            } catch (error) {
              toast.error('Failed to upload profile image. Please try again.')
              setIsUploadingImage(false)
              return
            }
            setIsUploadingImage(false)
          }

          // Prepare update data
          const updateData: any = {
            email: data.email,
            name: data.name,
          }

          // Include profile image if uploaded
          if (profileImageId !== null) {
            updateData.profileImage = profileImageId
          } else if (removeProfileImage) {
            // If user clicked remove, set to null
            updateData.profileImage = null
          }

          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
            body: JSON.stringify(updateData),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'PATCH',
          })

          if (response.ok) {
            const json = await response.json()
            setUser(json.doc)
            toast.success('Successfully updated account.')
            setChangePassword(false)
            setProfileImageFile(null)
            setProfileImagePreview(null)
            setRemoveProfileImage(false)
            if (fileInputRef.current) {
              fileInputRef.current.value = ''
            }
            reset({
              name: json.doc.name,
              email: json.doc.email,
              password: '',
              passwordConfirm: '',
            })
          } else {
            const error = await response.json()
            toast.error(error.errors?.[0]?.message || 'There was a problem updating your account.')
          }
        } catch (error) {
          toast.error('An error occurred while updating your account.')
        }
      }
    },
    [user, setUser, reset, profileImageFile, uploadProfileImage],
  )

  useEffect(() => {
    if (user === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset, changePassword])

  return (
    <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      {!changePassword ? (
        <Fragment>
          <div className="prose dark:prose-invert mb-8">
            <p className="">
              {'Change your account details below, or '}
              <Button
                className="px-0 text-inherit underline hover:cursor-pointer"
                onClick={() => setChangePassword(!changePassword)}
                type="button"
                variant="link"
              >
                click here
              </Button>
              {' to change your password.'}
            </p>
          </div>

          <div className="flex flex-col gap-8 mb-8">
            {/* Profile Image Upload */}
            <FormItem>
              <Label className="mb-2">Profile Image</Label>
              <div className="flex items-start gap-4">
                {/* Current/Preview Image */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center shrink-0">
                  {getProfileImageUrl() ? (
                    <>
                      <Image
                        src={getProfileImageUrl()!}
                        alt="Profile"
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                      {profileImagePreview && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-0 right-0 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                          aria-label="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </>
                  ) : (
                    <UserIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>

                {/* Upload Controls */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      {profileImageFile || getProfileImageUrl() ? 'Change Image' : 'Upload Image'}
                    </Button>
                    {(profileImageFile || getProfileImageUrl()) && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveImage}
                        disabled={isUploadingImage}
                        className="flex items-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Upload profile image"
                  />
                </div>
              </div>
            </FormItem>

            <FormItem>
              <Label htmlFor="email" className="mb-2">
                Email Address
              </Label>
              <Input
                id="email"
                {...register('email', { required: 'Please provide an email.' })}
                type="email"
              />
              {errors.email && <FormError message={errors.email.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="name" className="mb-2">
                Name
              </Label>
              <Input
                id="name"
                {...register('name', { required: 'Please provide a name.' })}
                type="text"
              />
              {errors.name && <FormError message={errors.name.message} />}
            </FormItem>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="prose dark:prose-invert mb-8">
            <p>
              {'Change your password below, or '}
              <Button
                className="px-0 text-inherit underline hover:cursor-pointer"
                onClick={() => setChangePassword(!changePassword)}
                type="button"
                variant="link"
              >
                cancel
              </Button>
              .
            </p>
          </div>

          <div className="flex flex-col gap-8 mb-8">
            <FormItem>
              <Label htmlFor="password" className="mb-2">
                New password
              </Label>
              <Input
                id="password"
                {...register('password', { required: 'Please provide a new password.' })}
                type="password"
              />
              {errors.password && <FormError message={errors.password.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="passwordConfirm" className="mb-2">
                Confirm password
              </Label>
              <Input
                id="passwordConfirm"
                {...register('passwordConfirm', {
                  required: 'Please confirm your new password.',
                  validate: (value) => value === password.current || 'The passwords do not match',
                })}
                type="password"
              />
              {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} />}
            </FormItem>
          </div>
        </Fragment>
      )}
      <Button 
        disabled={isLoading || isSubmitting || (!isDirty && !profileImageFile && !removeProfileImage) || isUploadingImage} 
        type="submit" 
        variant="default"
      >
        {isLoading || isSubmitting || isUploadingImage
          ? 'Processing'
          : changePassword
            ? 'Change Password'
            : 'Update Account'}
      </Button>
    </form>
  )
}
