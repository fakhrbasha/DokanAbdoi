import React from 'react';
// components
import CouponCodeForm from '@/components/forms/coupon-code';
import { CouponCode } from '@/types/models';

interface EditCouponCodeProps {
  data: CouponCode;
  isLoading: boolean;
}

export default function EditCouponCode({ data, isLoading }: EditCouponCodeProps): React.JSX.Element {
  return (
    <div>
      <CouponCodeForm data={data} isLoading={isLoading} />
    </div>
  );
}
