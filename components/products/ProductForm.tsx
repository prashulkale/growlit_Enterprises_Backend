"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Loader2 } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { productSchema, ProductFormValues } from '@/lib/validations/product';

interface ProductFormProps {
  initialData?: ProductFormValues;
  productId?: string;
}

export function ProductForm({ initialData, productId }: ProductFormProps = {}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      capacity: '',
      category: '',
      description: '',
      features: [''],
      applications: [''],
      images: [],
    },
  });
  
  const addFeature = () => {
    const features = form.getValues('features');
    form.setValue('features', [...features, '']);
  };
  
  const removeFeature = (index: number) => {
    const features = form.getValues('features');
    form.setValue(
      'features',
      features.filter((_, i) => i !== index)
    );
  };
  
  const addApplication = () => {
    const applications = form.getValues('applications');
    form.setValue('applications', [...applications, '']);
  };
  
  const removeApplication = (index: number) => {
    const applications = form.getValues('applications');
    form.setValue(
      'applications',
      applications.filter((_, i) => i !== index)
    );
  };
  
  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true);
    
    try {
      const url = productId
        ? `/api/products/${productId}`
        : '/api/products';
      
      const method = productId ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save product');
      }
      
      toast.success(productId ? 'Product updated' : 'Product created');
      router.push('/dashboard/products');
      router.refresh();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Plate Heat Exchanger" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input placeholder="10 m² - 1000 m²" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="heat-exchangers">Heat Exchangers</SelectItem>
                      <SelectItem value="pumps">Pumps</SelectItem>
                      <SelectItem value="valves">Valves</SelectItem>
                      <SelectItem value="filters">Filters</SelectItem>
                      <SelectItem value="tanks">Tanks</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the product..."
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <div className="flex items-center justify-between">
                <FormLabel>Features</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Feature
                </Button>
              </div>
              <div className="mt-2 space-y-3">
                {form.watch('features').map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`features.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Enter a product feature"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      disabled={form.watch('features').length === 1}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove feature</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <FormLabel>Applications</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addApplication}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Application
                </Button>
              </div>
              <div className="mt-2 space-y-3">
                {form.watch('applications').map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`applications.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Enter an application"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeApplication(index)}
                      disabled={form.watch('applications').length === 1}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove application</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <FormLabel>Product Images</FormLabel>
              <FormDescription>
                Upload product images. You can add multiple images.
              </FormDescription>
              <div className="mt-2">
                <div className="flex flex-wrap gap-4 mb-4">
                  {form.watch('images').map((image, index) => (
                    <div key={index} className="relative h-24 w-24 overflow-hidden rounded-md">
                      <img 
                        src={image} 
                        alt={`Product image ${index + 1}`} 
                        className="h-full w-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-1 top-1 h-6 w-6"
                        onClick={() => {
                          const images = form.getValues('images');
                          form.setValue(
                            'images',
                            images.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <CldUploadWidget
                  uploadPreset="growlit_preset_backup"
                  onSuccess={(result: any) => {
                    const images = form.getValues('images');
                    form.setValue('images', [
                      ...images,
                      result.info.secure_url,
                    ]);
                    toast.success('Image uploaded successfully');
                  }}
                  onError={() => {
                    toast.error('Failed to upload image');
                  }}
                >
                  {({ open }) => (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => open()}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  )}
                </CldUploadWidget>
                
                <FormMessage>
                  {form.formState.errors.images?.message}
                </FormMessage>
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.push('/dashboard/products')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {initialData ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}







// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { X, Plus, Loader2 } from 'lucide-react';
// import { CldUploadWidget } from 'next-cloudinary';

// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'sonner';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Card, CardContent } from '@/components/ui/card';

// interface ProductFormProps {
//   initialData?: {
//     name: string;
//     capacity: string;
//     category: string;
//     description: string;
//     features: string[];
//     applications: string[];
//     images: string[];
//   };
//   productId?: string;
// }

// export function ProductForm({ initialData, productId }: ProductFormProps = {}) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: initialData?.name || '',
//     capacity: initialData?.capacity || '',
//     category: initialData?.category || '',
//     description: initialData?.description || '',
//     features: initialData?.features || [''],
//     applications: initialData?.applications || [''],
//     images: initialData?.images || [],
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleArrayChange = (field: 'features' | 'applications', index: number, value: string) => {
//     setFormData(prev => {
//       const newArray = [...prev[field]];
//       newArray[index] = value;
//       return { ...prev, [field]: newArray };
//     });
//   };

//   const addItem = (field: 'features' | 'applications') => {
//     setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
//   };

//   const removeItem = (field: 'features' | 'applications', index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index)
//     }));
//   };

//   const removeImage = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }));
//   };

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
  
//     try {
//       // Clean up empty strings from arrays
//       const payload = {
//         ...formData,
//         features: formData.features.filter(f => f.trim() !== ''),
//         applications: formData.applications.filter(a => a.trim() !== ''),
//       };
//       console.log(payload)
//       const url = productId ? `/api/products/${productId}` : '/api/products';
//       const method = productId ? 'PATCH' : 'POST';
  
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });
//       router.push('/dashboard/products');
   
//       // console.log(response.body)
//       if (!response.ok) {
//         throw new Error("Failed to save product");
//       }
  
//       toast.success(productId ? 'Product updated' : 'Product created');
//       router.push('/dashboard/products');
//       router.refresh();
//     } catch (error) {
//       console.error('Error saving product:', error);
//       toast.error("Failed to save product");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <Card>
//       <CardContent className="pt-6">
//         <form onSubmit={onSubmit} className="space-y-8">
//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium">Product Name</label>
//               <Input
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Plate Heat Exchanger"
//                 required
//               />
//             </div>
            
//             <div className="space-y-2">
//               <label className="block text-sm font-medium">Capacity</label>
//               <Input
//                 name="capacity"
//                 value={formData.capacity}
//                 onChange={handleChange}
//                 placeholder="10 m² - 1000 m²"
//                 required
//               />
//             </div>
//           </div>
          
//           <div className="space-y-2">
//             <label className="block text-sm font-medium">Category</label>
//             <Select
//               value={formData.category}
//               onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="heat-exchangers">Heat Exchangers</SelectItem>
//                 <SelectItem value="pumps">Pumps</SelectItem>
//                 <SelectItem value="valves">Valves</SelectItem>
//                 <SelectItem value="filters">Filters</SelectItem>
//                 <SelectItem value="tanks">Tanks</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
          
//           <div className="space-y-2">
//             <label className="block text-sm font-medium">Description</label>
//             <Textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Describe the product..."
//               className="min-h-24"
//               required
//             />
//           </div>
          
//           <div>
//             <div className="flex items-center justify-between">
//               <label className="block text-sm font-medium">Features</label>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={() => addItem('features')}
//               >
//                 <Plus className="mr-2 h-4 w-4" />
//                 Add Feature
//               </Button>
//             </div>
//             <div className="mt-2 space-y-3">
//               {formData.features.map((feature, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <Input
//                     value={feature}
//                     onChange={(e) => handleArrayChange('features', index, e.target.value)}
//                     placeholder="Enter a product feature"
//                     className="flex-1"
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => removeItem('features', index)}
//                     disabled={formData.features.length === 1}
//                   >
//                     <X className="h-4 w-4" />
//                     <span className="sr-only">Remove feature</span>
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div>
//             <div className="flex items-center justify-between">
//               <label className="block text-sm font-medium">Applications</label>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={() => addItem('applications')}
//               >
//                 <Plus className="mr-2 h-4 w-4" />
//                 Add Application
//               </Button>
//             </div>
//             <div className="mt-2 space-y-3">
//               {formData.applications.map((application, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <Input
//                     value={application}
//                     onChange={(e) => handleArrayChange('applications', index, e.target.value)}
//                     placeholder="Enter an application"
//                     className="flex-1"
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => removeItem('applications', index)}
//                     disabled={formData.applications.length === 1}
//                   >
//                     <X className="h-4 w-4" />
//                     <span className="sr-only">Remove application</span>
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium">Product Images</label>
//             <p className="text-sm text-muted-foreground">
//               Upload product images. You can add multiple images.
//             </p>
//             <div className="mt-2">
//               <div className="flex flex-wrap gap-4 mb-4">
//                 {formData.images.map((image, index) => (
//                   <div key={index} className="relative h-24 w-24 overflow-hidden rounded-md">
//                     <img 
//                       src={image} 
//                       alt={`Product image ${index + 1}`} 
//                       className="h-full w-full object-cover"
//                     />
//                     <Button
//                       variant="destructive"
//                       size="icon"
//                       className="absolute right-1 top-1 h-6 w-6"
//                       onClick={() => removeImage(index)}
//                     >
//                       <X className="h-3 w-3" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
              
//               <CldUploadWidget
//                 uploadPreset="growlit_preset_backup"
//                 onSuccess={(result: any) => {
//                   setFormData(prev => ({
//                     ...prev,
//                     images: [...prev.images, result.info.secure_url]
//                   }));
//                   toast.success('Image uploaded successfully');
//                 }}
//                 onError={() => {
//                   toast.error('Failed to upload image');
//                 }}
//               >
//                 {({ open }) => (
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => open()}
//                   >
//                     <Plus className="mr-2 h-4 w-4" />
//                     Upload Image
//                   </Button>
//                 )}
//               </CldUploadWidget>
//             </div>
//           </div>
          
//           <div className="flex justify-end gap-4">
//             <Button 
//               type="button" 
//               variant="outline"
//               onClick={() => router.push('/dashboard/products')}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//               {initialData ? 'Update Product' : 'Create Product'}
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }