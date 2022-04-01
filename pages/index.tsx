import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'
import NewsletterForm from '@/components/NewsletterForm'
import { FaGithub, FaGithubAlt, FaGithubSquare, FaTwitter } from 'react-icons/fa'

const MAX_DISPLAY = 5

export default function Home() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="relative flex h-full w-full flex-row items-center justify-center space-x-24">
        <div className="container">
          <div className="glitch" data-text="ALANTOA">
            ALANTOA
          </div>
          <div className="glow">ALANTOA</div>
          <p className="subtitle">FRONT-END DEVELOPER</p>
          <div className="scanlines"></div>
        </div>
        <style global jsx>
          {`
            .container {
              position: absolute;
              transform: translate(-50%, -50%);
              top: 40%;
              left: 50%;
              font-family: 'Oswald', sans-serif;
              font-style: italic;
            }
            .glitch {
              color: rgb(223, 191, 191);
              position: relative;
              font-size: 9vw;
              animation: glitch 5s 5s infinite;
            }

            .glitch::before {
              content: attr(data-text);
              position: absolute;
              left: -2px;
              text-shadow: -5px 0 magenta;
              overflow: hidden;
              top: 0;
              animation: noise-1 3s linear infinite alternate-reverse, glitch 5s 5.05s infinite;
            }

            .glitch::after {
              content: attr(data-text);
              position: absolute;
              left: 2px;
              text-shadow: -5px 0 lightgreen;
              overflow: hidden;
              top: 0;
              animation: noise-2 3s linear infinite alternate-reverse, glitch 5s 5s infinite;
            }
            @keyframes glitch {
              1% {
                transform: rotateX(10deg) skewX(90deg);
              }
              2% {
                transform: rotateX(0deg) skewX(0deg);
              }
            }

            @keyframes noise-1 {
              $steps: 30;
              @for $i from 1 through $steps {
                #{percentage($i*(1/$steps))} {
                  $top: random(100);
                  $bottom: random(101 - $top);
                  clip-path: inset(#{$top}px 0 #{$bottom}px 0);
                }
              }
            }

            @keyframes noise-2 {
              $steps: 30;
              @for $i from 0 through $steps {
                #{percentage($i*(1/$steps))} {
                  $top: random(100);
                  $bottom: random(101 - $top);
                  clip-path: inset(#{$top}px 0 #{$bottom}px 0);
                }
              }
            }

            .scanlines {
              overflow: hidden;
              mix-blend-mode: difference;
            }

            .scanlines::before {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;

              background: repeating-linear-gradient(
                to bottom,
                transparent 0%,
                rgba(17, 17, 17, 0.05) 0.5%,
                transparent 1%
              );

              animation: fudge 7s ease-in-out alternate infinite;
            }

            @keyframes fudge {
              from {
                transform: translate(0px, 0px);
              }
              to {
                transform: translate(0px, 2%);
              }
            }

            .glow {
              @extend .glitch;
              text-shadow: 0 0 1000px rgb(223, 191, 191);
              color: transparent;
              position: absolute;
              top: 0;
            }

            .subtitle {
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 100;
              font-size: 0.8vw;
              color: rgba(165, 141, 141, 0.4);
              text-transform: uppercase;
              letter-spacing: 1em;
              text-align: center;
              position: absolute;
              left: 17%;
              animation: glitch-2 5s 5.02s infinite;
            }

            @keyframes glitch-2 {
              1% {
                transform: rotateX(10deg) skewX(70deg);
              }
              2% {
                transform: rotateX(0deg) skewX(0deg);
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
