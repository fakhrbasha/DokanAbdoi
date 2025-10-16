import * as React from 'react';

// mui
import { Grid, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
// components

import ProductDetailsSumary from '../_main/product/summary';
import ProductDetailsCarousel from '@/components/carousels/product-details-slider';
import { IoClose } from 'react-icons/io5';
import { Product } from '@/types/models';

interface ProductDetailsDialogProps {
  slug: string;
  onClose: () => void;
  open: boolean;
  isSimpleProduct?: boolean;
  product: {
    data: Product;
    totalRating?: number;
    totalReviews?: number;
  };
}

export default function ProductDetailsDialog({ onClose, open, slug, isSimpleProduct, product }: ProductDetailsDialogProps): React.JSX.Element {
  const [selectedVariant, setSelectedVariant] = React.useState('');

  React.useEffect(() => {
    if (product.data.type === 'variable') {
      setSelectedVariant(product.data.variants[0].name);
    }
  }, [product]);
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="lg">
      <Grid container spacing={2} justifyContent="center" sx={{ p: 4 }}>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 5,
            lg: 5
          }}
        >
          <ProductDetailsCarousel
            isSimpleProduct={isSimpleProduct}
            slug={slug}
            product={product.data}
            selectedVariant={selectedVariant}
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 7,
            lg: 7
          }}
        >
          <ProductDetailsSumary
            isPopup
            setSelectedVariant={setSelectedVariant}
            selectedVariant={selectedVariant}
            id={product.data._id}
            product={product.data}
            totalRating={product.totalRating}
            totalReviews={product.totalReviews}
            isSimpleProduct={isSimpleProduct}
          />
        </Grid>
      </Grid>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0
        }}
      >
        <IoClose />
      </IconButton>
    </Dialog>
  );
}
