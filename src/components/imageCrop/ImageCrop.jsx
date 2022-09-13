import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import { uploadImage } from '../../api/content/contentApi';
import MyPZButton from '@mypz/react-kit/components/inputs/button/MyPZButton';
import MyPZModal from '@mypz/react-kit/components/modal/MyPZModal';

import './ImageCrop.scss';

const ImageCrop = (props) => {
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: props.imageWidth / props.imageHeight });
    const [isCropped, setIsCropped] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageRef, setImageRef] = useState(null);
    const inputFileRef = useRef(null);

    useEffect(() => {
        if (props.imageUrl) {
            setImageUrl(props.imageUrl);
        }
    }, [props.imageUrl]);

    const clickOnUploadImage = () => {
        inputFileRef.current.click();
    };

    const onImageChange = (e) => {
        if (!e.target.files || e.target.files.length <= 0) {
            return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', () => setSrc(reader.result));
        reader.readAsDataURL(e.target.files[0]);
    };

    const onImageLoaded = (image) => {
        setImageRef(image);
        const w = image.width;
        const h = image.height;
        const a = w / h;
        const ta = crop.aspect;

        let fh = h;
        let fw = fh * ta;
        if (ta > a) {
            fw = w;
            fh = fw / ta;
        }

        setCrop({
            aspect: crop.aspect,
            width: fw,
            height: fh,
            x: 0,
            y: 0,
        });
        setIsCropped(fw > 0 && fh > 0);
        return false;
    };

    const onCropComplete = (crop) => {
        if (!crop || crop.width <= 0 || crop.height <= 0) {
            setIsCropped(false);
            return;
        }

        setIsCropped(true);
    };

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const getCroppedImageFile = () => {
        const canvas = document.createElement('canvas');
        const scaleX = imageRef.naturalWidth / imageRef.width;
        const scaleY = imageRef.naturalHeight / imageRef.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(imageRef, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);

        const dataURL = canvas.toDataURL();
        const blobBin = atob(dataURL.split(',')[1]);
        let array = [];
        for (let i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    };

    const clickOnConfirm = () => {
        if (props.onConfirm) {
            return props.onConfirm(getCroppedImageFile());
        }

        onCropConfirmed();
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const clickOnChangeImage = () => {
        setIsOpen(true);
    };

    const onCropConfirmed = () => {
        const file = getCroppedImageFile();
        setIsOpen(false);
        setImageUrl(null);

        uploadImage(file, props.imageWidth || 70, props.imageHeight || 70).then((res) => {
            setImageUrl(res.image.url);

            if (props.onImageUploaded) {
                props.onImageUploaded(res.image.id, res.image.url);
            }
        }).catch((err) => {
            console.log('err in image crop upload image:', err);
        });
    };

    const renderImage = () => {
        if (!imageUrl) {
            return null;
        }
        return (<img src={imageUrl} alt="imageToCrop" />);
    };

    const renderImageContainer = () => {
        if (props.disableImageContainer) {
            return null;
        }
        return (<div style={{ width: props.imageWidth, height: props.imageHeight }} className="image-crop__image-container">
            {renderImage()}
        </div>
        );
    };

    const renderUploadButton = () => {
        if (!props.uploadButtonLabel) {
            return (<MyPZButton onClick={clickOnChangeImage}><PhotoCameraIcon fontSize="inherit" /></MyPZButton>);
        }
        return (<div className="image-crop__upload-image-button">
            <MyPZButton onClick={clickOnChangeImage}>
                <span className="image-crop__upload-image-label">{props.uploadButtonLabel}</span> <PhotoCameraIcon fontSize="inherit" />
            </MyPZButton>
        </div>);
    };

    const renderImageToCrop = () => {
        if (!src) {
            return (<span className="image-crop__modal-crop-placeholder">Please select an Image</span>);
        }

        return (<div>
            <div className="image-crop__modal-crop-placeholder">Please crop the Image</div>
            <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={onImageLoaded}
                onComplete={onCropComplete}
                onChange={onCropChange}
            />
        </div>);
    };

    return (<div className="image-crop">
        {renderImageContainer()}
        {renderUploadButton()}
        <MyPZModal isOpen={isOpen} onClose={onClose}>
            <div className="image-crop__modal">
                <div className="image-crop__modal-actions">
                    <span><MyPZButton onClick={clickOnUploadImage}>Upload Image</MyPZButton></span>
                    <span><MyPZButton onClick={clickOnConfirm} disabled={!isCropped}>Confirm</MyPZButton></span>
                </div>
                <input accept="image/*" type="file" className="image-crop__modal-file-button" ref={inputFileRef} onChange={onImageChange} />
                <div className="image-crop__modal-cropper-area">
                    {renderImageToCrop()}
                </div>
            </div>
        </MyPZModal>
    </div>);
}

export default ImageCrop;