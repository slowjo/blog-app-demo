import { JSXMapSerializer, PrismicRichText } from "@prismicio/react";
import ArticleImage from "./ArticleImage";
import { RichTextField } from "@prismicio/client";


const components: JSXMapSerializer = {
    image: ({ node }) => (
        <ArticleImage src={node.url} width={node.dimensions.width} height={node.dimensions.height} alt={node.alt || ''} />  
    )
  }

export default function TextWithImages({ textandimages } : { textandimages: RichTextField }) {
    return (
        <PrismicRichText field={textandimages} components={components} />
    )
}